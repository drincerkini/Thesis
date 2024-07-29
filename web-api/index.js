const mongoose = require("mongoose");
const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");

dotenv.config(); // Load environment variables

const MONGO_CONECTION_URI = process.env.MONGO_CONECTION_URI;
const MONGO_PORT = process.env.MONGO_PORT;
const MONGO_DB_NAME = process.env.MONGO_DB_NAME;
const API_PORT = process.env.API_PORT || 3000;

// Construct the MongoDB connection string
const mongoConnectionString = `${MONGO_CONECTION_URI}:${MONGO_PORT}/${MONGO_DB_NAME}`;

mongoose
  .connect(mongoConnectionString)
  .then(() => {
    console.log(`Connected to MongoDB on port ${MONGO_PORT}`);

    const app = express();
    app.use(express.static("./uploads"));

    // Body parser library for accepting requests in JSON format
    app.use(bodyParser.json());

    // Multer library for storing images
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, "./../clientapp/public/uploads");
      },
      filename: function (req, file, cb) {
        const ext = file.mimetype.split("/")[1];
        cb(null, file.fieldname + "-" + Date.now() + "." + ext);
      },
    });

    const upload = multer({ storage });

    app.use(cors({ origin: "*" }));

    app.get("*", (req, res) => {
      res.json({ msg: "Not Found" });
    });

    // API Routes...

    // Server running port
    app.listen(API_PORT, () => {
      console.log(`Server is listening on port ${API_PORT} ....`);
    });
  })
  .catch((err) => console.error("Could not connect to MongoDB:", err));
