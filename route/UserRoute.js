// route.js
const express = require("express");
const router = express.Router();
const userController = require("../controller/UserController");
const authMiddleware = require('../middleware/UserMiddleware');

router.post("/register",authMiddleware,checkAdmin, userController.registerUser);
router.post("/login", userController.loginUser);
router.post('/logout', authMiddleware, userController.logoutUser);

function checkAuth(req, res, next) {
    if (!req.user) {
      return res.status(401).json({ error: 'Please log in to access this endpoint' });
    }
    next();
  }
function checkAdmin(req, res, next) {
    if (req.user?.role !== 0) {
      return res.status(403).json({ error: 'Only admins can access this endpoint' });
    }
    next();
  }

module.exports = router;
