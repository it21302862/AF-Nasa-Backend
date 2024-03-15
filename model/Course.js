const mongoose = require("mongoose");

const facultyAssignmentSchema = new mongoose.Schema({
  faculty: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  assignedAt: { type: Date, default: Date.now },
});

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  credits: { type: Number, required: true },
  faculties: [facultyAssignmentSchema], // Reference to the User model for faculty
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
