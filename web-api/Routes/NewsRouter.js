const express = require("express");
const newsController = require("../Controllers/NewsController");

const router = express.Router({ mergeParams: true });

router.get("/", newsController.get);

router.get("/:id", newsController.getById);

router.post("/", newsController.post);

router.delete("/:id", newsController.delete);

module.exports = router;
