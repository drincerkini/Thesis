const express = require("express");
const activityController = require("../Controllers/ActivityController");

const router = express.Router({ mergeParams: true });

router.get("/", activityController.get);

router.get("/:id", activityController.getbyid);

router.post("/", activityController.post);

router.delete("/", activityController.delete);

module.exports = router;
