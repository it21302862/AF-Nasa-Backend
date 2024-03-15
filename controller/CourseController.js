const courseService = require('../service/CourseService');

// Function to create a new course
async function createCourse(req, res) {
  try {
     // Getting the current user's role from the request object
    const currentUserRole = req.user?.role;

    // Checking if the current user is an admin
    if (currentUserRole !== 0) {
      throw new Error('Only admin can register new users');
    }
    const courseData = req.body;
    const course = await courseService.createCourse(courseData);
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Function to get all courses
async function getCourses(req, res) {
  try {
    const courses = await courseService.getCourses();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Function to assign a faculty to a course
async function assignFaculty(req, res) {
    try {
       // Getting the current user's role from the request object
    const currentUserRole = req.user?.role;

    // Checking if the current user is an admin
    if (currentUserRole !== 0) {
      throw new Error('Only admin can register new users');
    }

      const { courseId, facultyId } = req.body;
      const course = await courseService.assignFaculty(courseId, facultyId);
      res.status(200).json(course);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
  // Function to remove a faculty from a course
  async function removeFaculty(req, res) {
    try {
       // Getting the current user's role from the request object
    const currentUserRole = req.user?.role;

    // Checking if the current user is an admin
    if (currentUserRole !== 0) {
      throw new Error('Only admin can register new users');
    }
    
      const { courseId, facultyId } = req.params;
      const course = await courseService.removeFaculty(courseId, facultyId);
      res.status(200).json(course);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  module.exports = { createCourse, getCourses, assignFaculty ,removeFaculty};
