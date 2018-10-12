const Vehicle = require('../db/models/Vehicle');

const resolvers = {
  Query: {
    vehicles: () => {
      return Vehicle.find();
    },
  },
  Vehicle: {
    reminders: () => {
      return [{ id:'1111', date: 'time', notes: 'Dont forget to change oil'}];
    },
    serviceRecords: () => {
      return [{ id:'123', date: 'time', title: 'Oil Change', description: ''}]
    }
  },
  Mutation: {
    createVehicle: (root, args, context, info) => {
      const vehicle = new Vehicle({
        make: args.make
      });

      return vehicle.save();
    },
    createReminder: () => {
      return null;
    },
    createServiceRecord: () => {
      return null
    }
  }
};

module.exports = resolvers;