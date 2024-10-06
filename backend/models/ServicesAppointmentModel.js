const mongoose = require('mongoose');

const ServicesAppointmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  bookingDate: { type: Date, required: true },
  sessions: { type: String, required: true },
  option: { type: String, required: true },
});

const ServicesAppointmentModel = mongoose.model('ServicesAppointment', ServicesAppointmentSchema);
module.exports = ServicesAppointmentModel;
