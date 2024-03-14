const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  role: Number, // 0: Admin, 1: Faculty, 2: Student
  firstName: String,
  lastName: String,
  createdDate: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
