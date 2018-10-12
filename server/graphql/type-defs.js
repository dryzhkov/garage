const typeDefs = [`
  type Vehicle {
    id: String
    make: String
    serviceRecords: [ServiceRecord]
    reminders: [Reminder]
  }

  type ServiceRecord {
    id: String
    date: String
    title: String
    description: String
  }

  type Reminder {
    id: String
    date: String
    notes: String
  }

  type Query {
    vehicles: [Vehicle]
  }

  type Mutation {
    createVehicle(make: String): Vehicle
    createServiceRecord(vehicleId: String, date: String, title: String, description: String): ServiceRecord
    createReminder(vehicleId: String, date: String, notes: String): Reminder
  }

  schema {
    query: Query
    mutation: Mutation
  }
`];

module.exports = typeDefs;