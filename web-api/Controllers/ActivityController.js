const Activity = require("../Models/ActivityModel");
const moment = require("moment");

const ActivityController = {
  // Get all activities
  get: async (req, res) => {
    try {
      const activities = await Activity.find();
      const formattedActivities = activities.map((activity) => ({
        ...activity.toObject(),
        createdAt: moment(activity.createdAt).format("MMM D, YYYY"),
      }));
      res.json(formattedActivities);
    } catch (err) {
      console.error("Error fetching activities:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  // Get a single activity by ID
  getById: async (req, res) => {
    try {
      const activity = await Activity.findById(req.params.id);

      if (!activity) {
        return res.status(404).json({ error: "Activity not found" });
      }

      res.json(activity);
    } catch (err) {
      console.error("Error fetching activity:", err);
      res.status(404).json({ error: err.message });
    }
  },

  // Create a new activity
  post: async (req, res) => {
    try {
      const activity = new Activity({
        title: req.body.title,
        category: req.body.category,
        description: req.body.description,
        createdAt: req.body.createdAt
          ? new Date(req.body.createdAt)
          : Date.now(),
        image: req.file
          ? {
              filename: req.file.filename,
              mimetype: req.file.mimetype,
              size: req.file.size,
              url: req.file.path,
            }
          : undefined,
      });

      const newActivity = await activity.save();
      res.status(201).json(newActivity);
    } catch (err) {
      console.error("Error creating activity:", err);
      res.status(400).json({ error: err.message });
    }
  },

  // Delete an activity
  delete: async (req, res) => {
    try {
      const removeInfo = await Activity.findByIdAndDelete(req.params.id);

      if (!removeInfo) {
        return res.status(404).json({ error: "Activity not found" });
      }

      res.json({ message: "Activity deleted successfully" });
    } catch (err) {
      console.error("Error deleting activity:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

module.exports = ActivityController;
