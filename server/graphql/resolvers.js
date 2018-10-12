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
    reminders: ({_id}) => {
      return Vehicle.findOne({ _id }).then(v => v.reminders);
    },
    serviceRecords: ({_id}) => {
      return Vehicle.findOne({ _id }).then(v => v.serviceRecords);
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