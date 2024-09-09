const News = require("../models/NewsModel"); // Import the News model
const moment = require("moment");

const NewsController = {
  // Get all news items
  get: async (req, res) => {
    try {
      const list = await News.find();
      const formattedList = list.map((newsItem) => ({
        ...newsItem.toObject(),
        createdAt: moment(newsItem.createdAt).format("MMM D, YYYY"),
      }));
      res.json(formattedList);
    } catch (err) {
      console.error("Error fetching news:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  // Get a single news item by ID
  getById: async (req, res) => {
    try {
      const newsItem = await News.findById(req.params.id);

      if (!newsItem)
        return res.status(404).json({ error: "News item not found" });

      res.json(newsItem);
    } catch (err) {
      console.error("Error fetching news item:", err);
      res.status(404).json({ error: err.message });
    }
  },

  // Create a new news item
  post: async (req, res) => {
    try {
      const newsItem = new News({
        title: req.body.title,
        content: req.body.content,
        image: req.file
          ? {
              filename: req.file.filename,
              mimetype: req.file.mimetype,
              size: req.file.size,
              url: req.file.path,
            }
          : undefined,
      });

      const newNewsItem = await newsItem.save();
      res.status(201).json(newNewsItem);
    } catch (err) {
      console.error("Error creating news item:", err);
      res.status(400).json({ error: err.message });
    }
  },

  // Delete a news item
  delete: async (req, res) => {
    try {
      const removeInfo = await News.findByIdAndDelete(req.params.id);

      if (!removeInfo)
        return res.status(404).json({ error: "News item not found" });

      res.json({ message: "News item deleted successfully" });
    } catch (err) {
      console.error("Error deleting news item:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

module.exports = NewsController;
