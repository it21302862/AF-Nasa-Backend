const courseService = require("../service/CourseService");

// Function to create a new course
async function createCourse(req, res) {
  try {
    // Getting the current user's role from the request object
    const currentUserRole = req.user?.role;

    // Checking if the current user is an admin
    if (currentUserRole !== 0) {
      throw new Error("Only admin can create new courses");
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
    // Getting the current user's role from the request object
    const currentUserRole = req.user?.role;

    // Checking if the current user is an admin or student or faculty member
    if (
      currentUserRole !== 0 &&
      currentUserRole !== 1 &&
      currentUserRole !== 2
    ) {
      throw new Error(
        `Only students ,admin and faculty member can get courses.`
      );
    }

    const courses = await courseService.getCourses();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Function to update a course
async function updateCourse(req, res) {
  try {
    // Getting the current user's role from the request object
    const currentUserRole = req.user?.role;

    // Checking if the current user is an admin
    if (currentUserRole !== 0) {
      throw new Error("Only admin can update course details");
    }

    const { courseId } = req.params;
    const updatedCourseData = req.body;
    await courseService.updateCourse(courseId, updatedCourseData);
    res.status(200).json("Course updated successfully");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Function to delete a course
async function deleteCourse(req, res) {
  try {
    // Getting the current user's role from the request object
    const currentUserRole = req.user?.role;

    // Checking if the current user is an admin
    if (currentUserRole !== 0) {
      throw new Error("Only admin can delete new courses");
    }

    const { courseId } = req.params;
    await courseService.deleteCourse(courseId);
    res.status(200).json("Course deleted successfully");
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
      throw new Error("Only admin can assign faculty members for courses");
    }

    const { courseId, facultyId } = req.body;
    await courseService.assignFaculty(courseId, facultyId);
    res.status(200).json("faculty member assigned successfully");
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
      throw new Error("Only admin can remove faculty members from courses");
    }

    const { courseId, facultyId } = req.params;
    await courseService.removeFaculty(courseId, facultyId);
    res.status(200).json("removed faculty member from course");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createCourse,
  getCourses,
  updateCourse,
  deleteCourse,
  assignFaculty,
  removeFaculty,
};
