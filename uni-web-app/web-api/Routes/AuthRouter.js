const express = require("express");
const AuthController = require("../Controllers/AuthController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.get("/me", authMiddleware, AuthController.getCurrentUser);

module.exports = router;
