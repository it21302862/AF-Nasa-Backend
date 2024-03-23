const mongoose = require("mongoose");

// Define a schema for faculty assignment within a course
const facultyAssignmentSchema = new mongoose.Schema({
  faculty: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  position: {
    type: String,
  },
  assignedAt: {
    type: Date,
    default: Date.now,
  },
});

// Define the schema for a course
const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  credits: {
    type: Number,
    required: true,
  },
  faculties: [facultyAssignmentSchema],
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
