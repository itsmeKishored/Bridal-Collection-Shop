const mongoose = require('mongoose');

const NormalAppointmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  bookingDate: { type: Date, required: true },
  sessions: [{ sessionType: String, timeSlot: String }],
});

const NormalAppointmentModel = mongoose.model('NormalAppointment', NormalAppointmentSchema);
module.exports = NormalAppointmentModel;
