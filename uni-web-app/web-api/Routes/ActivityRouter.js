const express = require("express");
const activityController = require("../Controllers/ActivityController");

const router = express.Router({ mergeParams: true });

router.get("/", activityController.get);

router.get("/:id", activityController.getById);

router.post("/", activityController.post);

router.delete("/:id", activityController.delete);

module.exports = router;
