// models/CartModel.js
const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
}, { timestamps: true });

const cartSchema = new mongoose.Schema({
  items: [cartItemSchema],
}, { timestamps: true });

const CartModel = mongoose.model('Cart', cartSchema);

module.exports = CartModel;
