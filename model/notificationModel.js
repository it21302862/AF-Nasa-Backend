// models/notificationModel.js

const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    message: { type: String, required: true },
    recipientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    timestamp: { type: Date, default: Date.now },
    readStatus: { type: Boolean, default: false }
});

module.exports = mongoose.model('Notification', notificationSchema);
