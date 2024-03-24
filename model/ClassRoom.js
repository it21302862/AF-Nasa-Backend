const mongoose = require("mongoose");

const { Schema } = mongoose;

// Creating a new schema for the classroom model
const classroomSchema = new Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
});

const ClassRoom = mongoose.model("ClassRoom", classroomSchema);
module.exports = { ClassRoom };
