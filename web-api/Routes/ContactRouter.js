const express = require("express");
const contactsController = require("../Controllers/ContactsController");

const router = express.Router({ mergeParams: true });

router.get("/", contactsController.get);

router.get("/:id", contactsController.getById);

router.post("/", contactsController.post);

router.delete("/", contactsController.delete);

module.exports = router;
