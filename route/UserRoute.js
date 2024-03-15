const express = require("express");
const router = express.Router();
const userController = require("../controller/UserController");
const authMiddleware = require("../middleware/UserMiddleware");

// user routes
router.post("/register", authMiddleware, userController.registerUser);
router.post("/login", userController.loginUser);

module.exports = router;
