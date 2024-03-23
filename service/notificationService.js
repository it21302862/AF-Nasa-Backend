// services/notificationService.js

const StudentEnrollment = require('../models/studentEnrollmentModel');
const Notification = require('../models/notificationModel');

const sendTimetableChangeNotification = async (courseId) => {
    try {
        // Retrieve enrolled users for the course
        const enrollments = await StudentEnrollment.find({ courseId }).populate('studentId');

        // Generate notification message
        const message = `Timetable for your course has been updated (Course ID: ${courseId})`;

        // Generate notifications for each enrolled user
        const notifications = enrollments.map(enrollment => {
            return Notification.create({
                message,
                recipientId: enrollment.studentId
            });
        });

        // Save notifications to the database
        await Promise.all(notifications);

        return 'Notifications sent for timetable change';
    } catch (error) {
        throw error;
    }
};

module.exports = {
    sendTimetableChangeNotification
};
