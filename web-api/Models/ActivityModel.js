const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  title: String,
  category: String,
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
