const mongoose = require("mongoose");

// Defining the schema for a session
const sessionSchema = new mongoose.Schema({
  dayOfWeek: {
    type: String,
    enum: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  classRoomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ClassRoom",
    required: true,
  },
  isBooked: {
    type: Boolean,
    default: false,
  },
});

const Session = mongoose.model("Session", sessionSchema);

module.exports = Session;
