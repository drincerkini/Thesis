const express = require("express");
const applicationController = require("../Controllers/ApplicationController");

const router = express.Router({ mergeParams: true });

router.get("/", applicationController.get);

router.get("/:id", applicationController.getById);

router.post("/", applicationController.post);

router.delete("/:id", applicationController.delete);

module.exports = router;
