const mongoose = require("mongoose");

// Define the schema for news items
const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  image: {
    filename: String,
    mimetype: String,
    size: Number,
    url: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const News = mongoose.model("News", newsSchema);

module.exports = News;
