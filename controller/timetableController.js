const timeTableService = require("../service/timetableService");

const createTimetable = async (req, res, next) => {
  try {
    const timetableData = req.body;
    const timetable = await timeTableService.createTimetable(timetableData);
    res.status(201).json(timetable);
  } catch (error) {
    next(error);
  }
};

const addSessionToTimetable = async (req, res, next) => {
  try {
    const { timetableId, sessionId, facultyId } = req.body;
    const timetable = await timeTableService.addSessionToTimetable(
      timetableId,
      sessionId,
      facultyId
    );
    res.status(200).json(timetable);
  } catch (error) {
    next(error);
  }
};

const getCourseTimetable = async (req, res, next) => {
  try {
    const courseId = req.params.courseId;
    const courseTimetable = await timeTableService.getCourseTimetable(courseId);
    res.status(200).json(courseTimetable);
  } catch (error) {
    next(error);
  }
};

const removeSessionFromtimetable = async (req, res, next) => {
  try {
    const { timetableId, sessionId } = req.params;

    const updatedTimetable = await timeTableService.removeSessionFromtimetable(
      timetableId,
      sessionId
    );

    res
      .status(200)
      .json([updatedTimetable, "Remove session from timetable successfully"]);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTimetable,
  addSessionToTimetable,
  getCourseTimetable,
  removeSessionFromtimetable,
};
