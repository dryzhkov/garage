const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLList } = graphql;

const VehicleType = new GraphQLObjectType({
  name: 'Vehicle',
  fields: () => ({
    id: { type: GraphQLString },
    make: { type: GraphQLString },
    serviceRecords: new GraphQLList(ServiceRecordType),
    reminders: new GraphQLList(ReminderType)
  })
});

const ServiceRecordType = new GraphQLObjectType({
  name: 'ServiceRecord',
  fields: () => ({
    date: { type: GraphQLString },
    title: { type: GraphQLString },
    description: { type: GraphQLString }
  })
});

const ReminderType = new GraphQLObjectType({
  name: 'Reminder',
  fields: () => ({
    date: { type: GraphQLString },
    notes: { type: GraphQLString }
  })
});

module.exports = VehicleType;