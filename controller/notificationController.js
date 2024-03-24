// notificationController.js

const notificationService = require("../service/notificationService");

// Controller function to add an announcement
const addAnnouncement = async (req, res, next) => {
  try {
    const { message, title } = req.body;
    const announcement = await notificationService.addAnnouncement({
      message,
      title,
    });
    res.status(201).json(announcement);
  } catch (error) {
    next(error);
  }
};

// Controller function to remove an announcement
const removeAnnouncement = async (req, res, next) => {
  try {
    const announcementId = req.params.announcementId;
    const removedAnnouncement = await notificationService.removeAnnouncement(
      announcementId
    );
    res.status(200).json(removedAnnouncement);
  } catch (error) {
    next(error);
  }
};

// Controller function to get all notifications
const getAllNotifications = async (req, res, next) => {
  try {
    const notifications = await notificationService.getAllNotifications();
    res.status(200).json(notifications);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addAnnouncement,
  removeAnnouncement,
  getAllNotifications,
};
