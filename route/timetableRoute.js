const express = require("express");
const router = express.Router();
const {
  createTimetable,
  addSessionToTimetable,
  getCourseTimetable,
  removeSessionFromtimetable,getTimetableNotifications,removeTimetableById
} = require("../controller/timetableController");
const verifyToken = require("../middleware/UserMiddleware");
const AdminAccess = require("../AccessManager/AdminAccess");
const AllAccess = require("../AccessManager/AllAccess");

//route for timetable
router.post("/",verifyToken,AdminAccess, createTimetable);
router.post("/add-session",verifyToken,AdminAccess, addSessionToTimetable);
router.get("/:courseId",verifyToken,AllAccess, getCourseTimetable);
router.delete("/:timetableId/:sessionId",verifyToken,AdminAccess, removeSessionFromtimetable);
router.get("/notifications/",verifyToken,AllAccess, getTimetableNotifications);
router.delete("/:timetableId", verifyToken,AdminAccess, removeTimetableById);

module.exports = router;
