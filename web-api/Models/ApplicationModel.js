const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  surname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  birthDate: {
    type: Date,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
  },
  department: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Application = mongoose.model("Applications", applicationSchema);

module.exports = Application;
