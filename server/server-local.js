'use strict';

const app = require('./server');
const URL = 'http://localhost';
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Go to ${URL}:${PORT}/graphiql for GraphQL endpoint`);
  console.log(`Go to ${URL}:${PORT} for front-end website`);
});
