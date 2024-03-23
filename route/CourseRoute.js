const express = require("express");
const router = express.Router();
const {
  createCourse,
  getCourses,
  assignFaculty,
  removeFaculty,
  updateCourse,
  deleteCourse,
  getCourseById,
} = require("../controller/CourseController");
const verifyToken = require("../middleware/UserMiddleware");
const AdminAccess = require("../AccessManager/AdminAccess");
const AllAccess = require("../AccessManager/AllAccess");

// course routes
router.post("/", verifyToken, AdminAccess, createCourse);
router.get("/", verifyToken, AllAccess, getCourses);
router.get("/:courseId", verifyToken, AllAccess, getCourseById);
router.post("/assign-faculty", verifyToken, AdminAccess, assignFaculty);
router.put("/:courseId/:facultyId", verifyToken, AdminAccess, removeFaculty);
router.delete("/:courseId", verifyToken, AdminAccess, deleteCourse);
router.put("/:courseId", verifyToken, AdminAccess, updateCourse);
module.exports = router;
