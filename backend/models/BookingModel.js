const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  appointmentDate: { type: Date, required: true },
  status: { type: String, default: "pending" },
  jewelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Jewel' }
});

const BookingModel = mongoose.model("Booking", BookingSchema);
module.exports = BookingModel;
