// courseService.js
const Course = require('../model/Course');

async function createCourse(courseData) {
  try {
    const course = await Course.create(courseData);
    return course;
  } catch (error) {
    throw error;
  }
}

async function getCourses(currentUserRole) {
  try {
    // if (currentUserRole !== 0) {
    //     throw new Error('Only admin can register new users');
    //   }
    const courses = await Course.find().populate('faculties', 'firstName lastName');
    return courses;
  } catch (error) {
    throw error;
  }
}

async function assignFaculty(courseId, facultyId) { // Change facultyIds to facultyId
    try {
      const course = await Course.findByIdAndUpdate(courseId, { $addToSet: { faculties: { faculty: facultyId } } }, { new: true }); // Change facultyIds to facultyId
      return course;
    } catch (error) {
      throw error;
    }
}

async function removeFaculty(courseId, facultyId) {
  try {
      const course = await Course.findByIdAndUpdate(
          courseId,
          { $pull: { faculties: { faculty: facultyId } } },
          { new: true }
      );
      return course;
  } catch (error) {
      throw error;
  }
}

  


module.exports = { createCourse, getCourses, assignFaculty, removeFaculty };

