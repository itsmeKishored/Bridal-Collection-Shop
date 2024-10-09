const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  username: String,
  rating: Number,
  comment: String,
});

const jewelrySchema = new Schema({
  name: String,
  imageUrl: String,
  price: Number,
  description: String,
  rating: Number, // Overall rating (average)
  reviews: [reviewSchema], // Array of reviews
});

const JewelModel = mongoose.model('Jewelry', jewelrySchema);

module.exports = JewelModel;
