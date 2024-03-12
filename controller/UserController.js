// controller.js
const userService = require("../service/UserService");

async function registerUser(req, res) {
  try {
    const currentUserRole = req.user.role;
    const userData = req.body;
    const user = await userService.registerUser(userData, currentUserRole);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    const token = await userService.loginUser(email, password);
    res.status(200).json({ token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
}

async function logoutUser(req, res) {
  try {
    // No action needed on server-side for JWT token
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { registerUser, loginUser, logoutUser  };
