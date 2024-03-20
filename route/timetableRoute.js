const express = require("express");
const router = express.Router();
const {
  createTimetable,
  addSessionToTimetable,
  getCourseTimetable,
  removeSessionFromtimetable,
} = require("../controller/timetableController");

router.post("/", createTimetable);
router.post("/add-session", addSessionToTimetable);
router.get("/:courseId", getCourseTimetable);
router.delete("/:timetableId/:sessionId", removeSessionFromtimetable);

module.exports = router;
