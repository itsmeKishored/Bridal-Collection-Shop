// models/JewelModel.js
const mongoose = require("mongoose");

const JewelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  imageUrl: { type: String }
});

module.exports = mongoose.model("Jewel", JewelSchema);
