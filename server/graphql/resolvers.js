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
    createReminder: (_, args) => {
      const { vehicleId, date, notes } = args;

      if (!vehicleId || !notes) {
        throw new Error('Invalid payload: vehicleId and notes must be valid');
      }
      return Vehicle.findById({ _id: vehicleId })
        .then(vehicle => {
          vehicle.reminders.push(
            {
              date,
              notes
            }
          );

          return vehicle.save()
            .then(v => v.reminders.pop());
        });
    },
    deleteServiceRecord: (_, args) => {
      const { vehicleId, recordId } = args;

      if (!vehicleId || !recordId) {
        throw new Error('Invalid payload: vehicleId and recordId must be valid');
      }
      return Vehicle.findById({ _id: vehicleId })
      .then(vehicle => {
        vehicle.serviceRecords = vehicle.serviceRecords.filter((r) => r._id.toString() !== recordId);
        return vehicle.save()
          .then(() => recordId);
      });
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
    },
    deleteReminder: (_, args) => {
      const { vehicleId, reminderId } = args;

      if (!vehicleId || !reminderId) {
        throw new Error('Invalid payload: vehicleId and reminderId must be valid');
      }
      return Vehicle.findById({ _id: vehicleId })
      .then(vehicle => {
        vehicle.reminders = vehicle.reminders.filter((r) => r._id.toString() !== reminderId);
        return vehicle.save()
          .then(() => reminderId);
      });
    }
  }
};

module.exports = resolvers;