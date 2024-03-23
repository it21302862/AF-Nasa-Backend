// notificationModel.js

const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    message: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course', // If notifications are specific to a course
    }
});

module.exports = mongoose.model('Notification', notificationSchema);
