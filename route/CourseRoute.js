const express = require("express");
const router = express.Router();
const {
  createCourse,
  getCourses,
  assignFaculty,
  removeFaculty,
  updateCourse,
  deleteCourse,
} = require("../controller/CourseController");
const authMiddleware = require("../middleware/UserMiddleware");

// course routes
router.post("/", authMiddleware, createCourse);
router.get("/", authMiddleware, getCourses);
router.post("/assign-faculty", authMiddleware, assignFaculty);
router.put("/:courseId/:facultyId", authMiddleware, removeFaculty);
router.delete("/:courseId", authMiddleware, deleteCourse);
router.put("/:courseId", authMiddleware, updateCourse);
module.exports = router;
