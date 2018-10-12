const graphql = require('graphql');
const VehicleType = require('./VehicleType');
const Vehicle = require('../db/models/Vehicle');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema
} = graphql;

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    vehicle: {
      type: VehicleType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        return Vehicle.findById(args.id)
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});