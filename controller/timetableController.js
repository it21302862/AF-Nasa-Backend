const timeTableService = require("../service/timetableService");

// Controller function to create a new timetable
const createTimetable = async (req, res, next) => {
  try {
    const timetableData = req.body;
    const timetable = await timeTableService.createTimetable(timetableData);
    res.status(201).json(timetable);
  } catch (error) {
    next(error);
  }
};

// Controller function to add a session to a timetable
const addSessionToTimetable = async (req, res, next) => {
  try {
    const { timetableId, sessionId, facultyId } = req.body;
    const { timetable, notificationMessage } =
      await timeTableService.addSessionToTimetable(
        timetableId,
        sessionId,
        facultyId
      );
    res.status(200).json({ timetable, notificationMessage });
  } catch (error) {
    next(error);
  }
};

// Controller function to get the timetable of a specific course
const getCourseTimetable = async (req, res, next) => {
  try {
    const courseId = req.params.courseId;
    const { userId, role } = req.user;
    const courseTimetable = await timeTableService.getCourseTimetable(
      courseId,
      userId,
      role
    );
    res.status(200).json(courseTimetable);
  } catch (error) {
    next(error);
  }
};

// Controller function to remove a timetable by its ID
const removeTimetableById = async (req, res, next) => {
  try {
    const { timetableId } = req.params;
    const result = await timeTableService.removeTimetableById(timetableId);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// Controller function to remove a session from a timetable
const removeSessionFromtimetable = async (req, res, next) => {
  try {
    const { timetableId, sessionId } = req.params;

    const { notificationMessage } =
      await timeTableService.removeSessionFromtimetable(timetableId, sessionId);

    res
      .status(200)
      .json([
        "Remove session from timetable successfully",
        notificationMessage,
      ]);
  } catch (error) {
    next(error);
  }
};

// Controller function to get timetable notifications
const getTimetableNotifications = async (req, res, next) => {
  try {
    const notifications = await timeTableService.getTimetableNotifications();

    res.status(200).json(notifications);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTimetable,
  addSessionToTimetable,
  getCourseTimetable,
  removeSessionFromtimetable,
  getTimetableNotifications,
  removeTimetableById,
};
