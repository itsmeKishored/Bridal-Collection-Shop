const mongoose = require("mongoose");

const RegisterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: { 
    type: String,
    required: true
  },
  role: {
    type: String,
    default: "user"
  }
});

const RegisterModel = mongoose.model("registers", RegisterSchema);
module.exports = RegisterModel;
