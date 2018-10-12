const Hapi = require('hapi');
const { ApolloServer, gql } = require('apollo-server-hapi');
const schema = require('./graphql/schema');
const Vehicle = require('./db/models/Vehicle');
const mongo = require('./db/mongo');

mongo.connect();

const books = [
  {
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling',
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton',
  },
];

const typeDefs = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.

  # This "Book" type can be used in other type declarations.
  type Book {
    title: String
    author: String
  }

  # The "Query" type is the root of all GraphQL queries.
  # (A "Mutation" type will be covered later on.)
  type Query {
    books: [Book]
  }
`;

const resolvers = {
  Query: {
    books: () => books,
  },
};

const init = async () => {
  const server = new ApolloServer({ schema }); // new ApolloServer({ typeDefs, resolvers });

  const app = new Hapi.server({
    port: 4000
  });

  await server.applyMiddleware({
    app,
  });

  await server.installSubscriptionHandlers(app.listener);

  app.route([
    {
      method: 'GET',
      path: '/api/v1/vehicles',
      config: {
        description: 'Get all the vehicles',
        tags: ['api', 'v1', 'vehicles']
      },
      handler: (req, reply) => {
        return Vehicle.find();
      }
    },
    {
      method: 'POST',
      path: '/api/v1/vehicles',
      config: {
        description: 'Create a vehicle.',
        tags: ['api', 'v1', 'vehicle']
      },
      handler: (req, reply) => {
        const { make } = req.payload;
        const vehicle = new Vehicle({
          make
        });

        if (make) {
          return vehicle.save();
        } else {
          return reply.response({ error: 'make is required' }).code(400);
        }
      }
    },
    {
      method: 'GET',
      path: '/{param*}',
      handler: {
        file: '/public/index.html'
      }
    }
  ]);

  await app.start();
  console.log(`Server running at: ${app.info.uri}`);
};

process.on('unHandledRejection', (err) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
});

init().catch(error => console.log(error));