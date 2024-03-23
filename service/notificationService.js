// notificationService.js

const Notification = require("../model/notificationModel");

const addAnnouncement = async (announcementData) => {
    try {
        const announcement = await Notification.create(announcementData);
        return announcement;
    } catch (error) {
        throw error;
    }
};

const removeAnnouncement = async (announcementId) => {
    try {
        const announcement = await Notification.findByIdAndDelete(announcementId);
        return announcement;
    } catch (error) {
        throw error;
    }
};

const getAllNotifications = async () => {
    try {
        const notifications = await Notification.find();
        return notifications;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    addAnnouncement,
    removeAnnouncement,getAllNotifications
};
