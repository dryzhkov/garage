const Vehicle = require('../db/models/Vehicle');
const { ReadPreference } = require('mongodb');

const resolvers = {
  Query: {
    vehicles: () => {
      return Vehicle.find({})
        .read(ReadPreference.NEAREST)
        .exec();
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
    createServiceRecord: (root, args, context, info) => {
      const { vehicleId, date, title, description } = args;

      if (!vehicleId || !date || !title) {
        throw new Error('Invalid payload: vehicleId, date and title must be valid');
      }
      return Vehicle.findOne({ _id: vehicleId })
        .then(vehicle => {
          vehicle.serviceRecords.push(
            {
              date,
              title,
              description
            }
          );

          return vehicle.save()
            .then(v => v.serviceRecords.pop());
        });
    }
  }
};

module.exports = resolvers;