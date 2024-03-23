// controllers/notificationController.js

const notificationService = require('../service/notificationService');

const sendTimetableChangeNotification = async (req, res, next) => {
    try {
        const { courseId } = req.params;
        const result = await notificationService.sendTimetableChangeNotification(courseId);
        res.status(200).json({ message: result });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    sendTimetableChangeNotification
};
