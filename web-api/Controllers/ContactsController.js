const Contact = require("../Models/ContactModel");
const moment = require("moment");

const ContactController = {
  // Get all contact submissions
  get: async (req, res) => {
    try {
      const list = await Contact.find();
      const formattedList = list.map((contactItem) => ({
        ...contactItem.toObject(),
        createdAt: moment(contactItem.createdAt).format("MMM D, YYYY"),
      }));
      res.json(formattedList);
    } catch (err) {
      console.error("Error fetching contact submissions:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  // Get a single contact submission by ID
  getById: async (req, res) => {
    try {
      const contactItem = await Contact.findById(req.params.id);

      if (!contactItem)
        return res.status(404).json({ error: "Contact submission not found" });

      res.json(contactItem);
    } catch (err) {
      console.error("Error fetching contact submission:", err);
      res.status(404).json({ error: err.message });
    }
  },

  // Create a new contact submission
  post: async (req, res) => {
    try {
      const contactItem = new Contact({
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        message: req.body.message,
      });

      const newContactItem = await contactItem.save();
      res.status(201).json(newContactItem);
    } catch (err) {
      console.error("Error creating contact submission:", err);
      res.status(400).json({ error: err.message });
    }
  },

  // Delete a contact submission
  delete: async (req, res) => {
    try {
      const removeInfo = await Contact.findByIdAndDelete(req.params.id);

      if (!removeInfo)
        return res.status(404).json({ error: "Contact submission not found" });

      res.json({ message: "Contact submission deleted successfully" });
    } catch (err) {
      console.error("Error deleting contact submission:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

module.exports = ContactController;
