const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  image: {
    filename: String,
    mimetype: String,
    size: Number,
    url: String,
  },
});

const model = mongoose.model("activity", schema);

module.exports = model;
