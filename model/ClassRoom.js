const mongoose = require("mongoose");

const { Schema } = mongoose;

const timeSlotSchema = new Schema({
    startTime: {
        type: String,
        required: true,
    },
    endTime: {
        type: String,
        required: true,
    },
});

const bookedDateSchema = new Schema({
    date: {
        type: Date,
        required: true,
    },
    timeSlots: {
        type: [timeSlotSchema],
        required: true,
    },
});

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
    bookedDates: {
        type: [bookedDateSchema],
        default: [],
    },
});

const ClassRoom = mongoose.model("ClassRoom", classroomSchema);

module.exports = { ClassRoom };