// courseController.js
const courseService = require('../service/CourseService');

async function createCourse(req, res) {
  try {
    const courseData = req.body;
    const course = await courseService.createCourse(courseData);
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getCourses(req, res) {
  try {
    
    const currentUserRole = req.user?.role;
    const courses = await courseService.getCourses(currentUserRole);
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Add more controller functions for updating and deleting courses as needed
async function assignFaculty(req, res) {
    try {
      const { courseId, facultyId } = req.body;
      const course = await courseService.assignFaculty(courseId, facultyId);
      res.status(200).json(course);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
  async function removeFaculty(req, res) {
    try {
      const { courseId, facultyId } = req.body;
      const course = await courseService.removeFaculty(courseId, facultyId);
      res.status(200).json(course);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  module.exports = { createCourse, getCourses, assignFaculty ,removeFaculty};
