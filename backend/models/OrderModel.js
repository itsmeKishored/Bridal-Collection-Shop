const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  items: [{
    itemName: String,
    price: Number,
    quantity: Number
  }],
  shippingInfo: {
    name: String,
    address: String,
    phone: String,  // Add phone number field here
    city: String,
    zip: String,
    country: String
  },
  accountDetails: {
    accountNumber: String,
    cvc: String,
    expiryDate: String
  },
  totalPrice: Number,
  status: { type: String, default: "pending" } // pending, paid, etc.
});

const OrderModel = mongoose.model('Order', OrderSchema);

module.exports = OrderModel;
