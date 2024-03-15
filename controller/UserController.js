const userService = require("../service/UserService");

// Function to handle user registration
async function registerUser(req, res) {
  try {
    // Getting the current user's role from the request object
    const currentUserRole = req.user?.role;

    // Checking if the current user is an admin
    if (currentUserRole !== 0) {
      throw new Error("Only admin can register new users");
    }

    const userData = req.body;
    const user = await userService.registerUser(userData, currentUserRole);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Function to handle user login
async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    const token = await userService.loginUser(email, password);
    res.status(200).json({ token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
}

module.exports = { registerUser, loginUser };
