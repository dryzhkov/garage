const mongo = require("./db/mongo");
const express = require("express");
const bodyParser = require("body-parser");
const { graphqlExpress, graphiqlExpress } = require("graphql-server-express");
const { makeExecutableSchema } = require("graphql-tools");
const cors = require("cors");
const typeDefs = require("./graphql/type-defs");
const resolvers = require("./graphql/resolvers");
const path = require("path");

require("dotenv").config({ path: "./.env-dev" }); // CHANGE THIS TO ./.env-prod

const app = express();
app.use(cors());

const HOME_PATH = "/graphiql";
const URL = "http://localhost";
const PORT = 3002;

var jwt = require("express-jwt");
var jwks = require("jwks-rsa");
var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
  }),
  audience: process.env.AUDIENCE,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ["RS256"]
});

const start = () => {
  mongo.connect();

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers
  });

  app.use(express.static(path.join(__dirname, "public")));
  app.use("/graphql", jwtCheck, bodyParser.json(), graphqlExpress({ schema }));
  app.use(
    HOME_PATH,
    graphiqlExpress({
      endpointURL: "/graphql"
    })
  );

  app.get("/callback", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
  });

  app.get("/login", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
  });

  app.listen(PORT, () => {
    console.log(`Go to ${URL}:${PORT}${HOME_PATH} for GraphQL endpoint`);
    console.log(`Go to ${URL}:${PORT} for front-end website`);
  });
};

process.on("unHandledRejection", err => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
});

start();
