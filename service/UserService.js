// service.js
const bcrypt = require("bcrypt");
const User = require("../model/UserModel");
const jwt = require("jsonwebtoken");

// Function to register a new user
async function registerUser(userData) {
  try {
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      throw new Error("Email already exists");
    }
    // Hashing the password using bcrypt
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = new User({
      email: userData.email,
      password: hashedPassword,
      role: userData.role,
      name: userData.name,
      firstName: userData.firstName,
      lastName: userData.lastName,
      createdDate: new Date(),
    });
    await user.save();
    return user;
  } catch (error) {
    throw error;
  }
}

// Function to log in a user
async function loginUser(email, password) {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      "secret_key",
      { expiresIn: "1h" }
    );

    return token;
  } catch (error) {
    throw error;
  }
}

module.exports = { registerUser, loginUser };
