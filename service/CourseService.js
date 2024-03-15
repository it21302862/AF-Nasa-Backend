const Course = require("../model/Course");

// Function to create a new course
async function createCourse(courseData) {
  try {
    const course = await Course.create(courseData);
    return course;
  } catch (error) {
    throw error;
  }
}

// Function to retrieve all courses with populated faculties
async function getCourses() {
  try {
    const courses = await Course.find().populate(
      "faculties",
      "firstName lastName"
    );
    return courses;
  } catch (error) {
    throw error;
  }
}

// Function to update course details
async function updateCourse(courseId, updatedCourseData) {
  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      { $set: updatedCourseData },
      { new: true }
    );
    if (!updatedCourse) {
      throw new Error("Course not found");
    }
    return updatedCourse;
  } catch (error) {
    throw error;
  }
}

// Function to delete a course
async function deleteCourse(courseId) {
  try {
    const deletedCourse = await Course.findByIdAndDelete(courseId);
    if (!deletedCourse) {
      throw new Error("Course not found");
    }
    return deletedCourse;
  } catch (error) {
    throw error;
  }
}

// Function to assign a faculty members to a course
async function assignFaculty(courseId, facultyId) {
  try {
    const course = await Course.findByIdAndUpdate(
      courseId,
      { $addToSet: { faculties: { faculty: facultyId } } },
      { new: true }
    );
    return course;
  } catch (error) {
    throw error;
  }
}

// Function to remove a faculty member from a course
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

module.exports = {
  createCourse,
  getCourses,
  updateCourse,
  deleteCourse,
  assignFaculty,
  removeFaculty,
};
