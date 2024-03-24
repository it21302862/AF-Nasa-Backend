const express = require("express");
const router = express.Router();
const {
  enrollStudentInCourse,
  getAllEnrollmentForCourse,
  getStudentEnrollments,
  unenrollStudentFromCourse,
} = require("../controller/studentEnrollmentController");
const verifyToken = require("../middleware/UserMiddleware");
const AdminFacultyAccess = require("../AccessManager/AdminFacultyAccess");
const AllAccess = require("../AccessManager/AllAccess");

// route for student enrollement
router.post("/",verifyToken,AllAccess, enrollStudentInCourse);
router.get("/student/:studentId",verifyToken,AdminFacultyAccess, getStudentEnrollments);
router.get("/course/:courseId",verifyToken,AdminFacultyAccess, getAllEnrollmentForCourse);
router.delete("/:enrollmentId",verifyToken,AdminFacultyAccess, unenrollStudentFromCourse);

module.exports = router;
