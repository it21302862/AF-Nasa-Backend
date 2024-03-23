const express = require("express");
const router = express.Router();
const {
  enrollStudentInCourse,
  getAllEnrollmentForCourse,
  getStudentEnrollments,
} = require("../controller/studentEnrollmentController");

router.post("/", enrollStudentInCourse);
router.get("/student/:studentId", getStudentEnrollments);
router.get("/course/:courseId", getAllEnrollmentForCourse);

module.exports = router;
