const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  bookingDate: { type: Date, required: true },
  sessions: { type: String, required: true },
  option: { type: String, required: false }, // if you decide to add this
});

const AppointmentModel = mongoose.model('Appointment', AppointmentSchema);
module.exports = AppointmentModel;
