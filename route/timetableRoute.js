const express = require("express");
const router = express.Router();
const {
  createTimetable,
  addSessionToTimetable,
  getCourseTimetable,
} = require("../controller/timetableController");

router.post("/", createTimetable);
router.post("/add-session", addSessionToTimetable);
router.get("/:courseId", getCourseTimetable);
module.exports = router;
