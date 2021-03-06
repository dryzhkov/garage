const mongo = require('../db/mongo');
const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('graphql-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const cors = require('cors');
const typeDefs = require('../graphql/type-defs');
const resolvers = require('../graphql/resolvers');
const path = require('path');
const url = require('url');

require('dotenv').config();

const app = express();
app.use(cors());

const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
  }),
  audience: process.env.AUDIENCE,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ['RS256'],
});

mongo.connect();

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const baseUrlPath =
  process.env.NODE_ENV === 'dev' ? '' : '/.netlify/functions/server';

app.use(express.static(path.join(__dirname, '../public')));
app.use(
  `${baseUrlPath}/graphql`,
  jwtCheck,
  bodyParser.json(),
  graphqlExpress({ schema })
);
app.use(
  `${baseUrlPath}/graphiql`,
  graphiqlExpress({
    endpointURL: '/graphql',
  })
);

app.get(`${baseUrlPath}/callback`, (req, res) => {
  // res.sendFile(path.resolve(__dirname, '../public/index.html'));
  res.redirect(
    url.format({
      pathname: '/',
      query: req.query,
    })
  );
});

process.on('unHandledRejection', (err) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
});

module.exports = app;
module.exports.handler = serverless(app);
