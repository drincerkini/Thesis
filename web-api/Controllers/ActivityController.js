const ActivityModel = require("../Models/ActivityModel");
const moment = require("moment");

const ActivityController = {
  get: async (req, res) => {
    try {
      const list = await ActivityModel.find();
      const formattedList = list.map((Activity) => ({
        ...Activity.toObject(),
        createdAt: moment(Activity.createdAt).format("MMM D, YYYY"),
      }));
      return res.json(formattedList);
    } catch (err) {
      console.log("error -- ", err);
    }
  },

  getbyid: async (req, res) => {
    try {
      const info = await ActivityModel.findOne({ _id: req.params.id });

      if (!info) throw Error("Product not Found!");

      return res.json(info);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  },

  post: async (req, res) => {
    const info = new ActivityModel({
      title: req.body.title,
      category: req.body.category,
      image: {
        filename: req.file.filename,
        mimetype: req.file.mimetype,
        size: req.file.size,
        url: req.file.path,
      },
    });
    try {
      const newInfo = await info.save();
      res.status(200).json(newInfo);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  delete: async (req, res) => {
    try {
      const removeInfo = await ActivityModel.remove({ _id: req.params.id });
      removeInfo.save();
      res.json(removeInfo);
    } catch (err) {
      res.json({ msg: true });
    }
  },
};

module.exports = ActivityController;
