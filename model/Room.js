const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  name: String,
  capacity: Number,
  resources: [String],
  availability: [{
    day: String,
    time: String,
    is_available: Boolean,
  }],
  bookings: [{
    start_time: Date,
    end_time: Date,
  }],
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
