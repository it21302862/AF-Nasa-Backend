const mongoose = require("mongoose");

const { Schema } = mongoose;

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
});

const ClassRoom = mongoose.model("ClassRoom", classroomSchema);

module.exports = { ClassRoom };