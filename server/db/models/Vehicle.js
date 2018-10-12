const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VehicleSchema = new Schema({
  make: String,
  serviceRecords: [{
    date: Date,
    title: String,
    escription: String
  }],
  reminders: [{
    date: Date,
    notes: String
  }]
});

module.exports = mongoose.model('Vehicle', VehicleSchema);