const Notification = require("../model/notificationModel");

// Function to add an announcement
const addAnnouncement = async (announcementData) => {
  try {
    const announcement = await Notification.create(announcementData);
    return announcement;
  } catch (error) {
    throw error;
  }
};

// Function to remove an announcement by its ID
const removeAnnouncement = async (announcementId) => {
  try {
    const announcement = await Notification.findByIdAndDelete(announcementId);
    return announcement;
  } catch (error) {
    throw error;
  }
};

// Function to get all notifications
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
  removeAnnouncement,
  getAllNotifications,
};
