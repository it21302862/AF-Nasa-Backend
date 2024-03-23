const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controller/UserController");
const verifyToken = require("../middleware/UserMiddleware");
const AdminAccess = require("../AccessManager/AdminAccess");

// user routes
router.post("/register", verifyToken, AdminAccess, registerUser);
router.post("/login", loginUser);

module.exports = router;
