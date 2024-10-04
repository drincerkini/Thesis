const Application = require("../models/ApplicationModel");
const moment = require("moment");

const ApplicationController = {
  // Get all applications
  get: async (req, res) => {
    try {
      const list = await Application.find();
      const formattedList = list.map((application) => ({
        ...application.toObject(),
        createdAt: moment(application.createdAt).format("MMM D, YYYY"),
      }));
      res.json(formattedList);
    } catch (err) {
      console.error("Error fetching applications:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  // Get a single application by ID
  getById: async (req, res) => {
    try {
      const application = await Application.findById(req.params.id);

      if (!application)
        return res.status(404).json({ error: "Application not found" });

      res.json(application);
    } catch (err) {
      console.error("Error fetching application:", err);
      res.status(404).json({ error: err.message });
    }
  },

  // Create a new application
  post: async (req, res) => {
    try {
      const application = new Application({
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        birthDate: req.body.birthDate,
        address: req.body.address,
        phoneNumber: req.body.phoneNumber,
        department: req.body.department,
      });

      const newApplication = await application.save();
      res.status(201).json(newApplication);
    } catch (err) {
      console.error("Error creating application:", err);
      res.status(400).json({ error: err.message });
    }
  },

  // Delete an application
  delete: async (req, res) => {
    try {
      const removeInfo = await Application.findByIdAndDelete(req.params.id);

      if (!removeInfo)
        return res.status(404).json({ error: "Application not found" });

      res.json({ message: "Application deleted successfully" });
    } catch (err) {
      console.error("Error deleting application:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

module.exports = ApplicationController;
