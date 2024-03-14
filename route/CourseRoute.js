// courseRoute.js
const express = require('express');
const router = express.Router();
const courseController = require('../controller/CourseController');

router.post('/', courseController.createCourse);
router.get('/courses', courseController.getCourses);
router.post('/assign-faculty', courseController.assignFaculty); // Route for assigning faculty
router.put('/:courseId/delete/:facultyId', courseController.removeFaculty);


function checkAdmin(req, res, next) {
  // Assuming user role is stored in req.user.role
  if (req.user?.role !== 0) {
    return res.status(403).json({ error: 'Only admins can access this endpoint' });
  }
  next();
}

module.exports = router;
