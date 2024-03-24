const StudentEnrollment = require("../model/studentEnrollmentModel");

// Service function to enroll a student in a course
const enrollStudentInCourse = async (studentId, courseId) => {
  try {
    // Check if the enrollment already exists
    const existingEnrollment = await StudentEnrollment.findOne({
      studentId,
      courseId,
    });

    if (existingEnrollment) {
      throw new Error("Student is already enrolled in this course");
    }

    const enrollment = await StudentEnrollment.create({ studentId, courseId });
    return enrollment;
  } catch (error) {
    throw error;
  }
};

// Service function to get enrollments for a specific student
const getStudentEnrollment = async (studentId) => {
  try {
    const enrollment = await StudentEnrollment.find({ studentId });
    return enrollment;
  } catch (error) {
    throw error;
  }
};

// Service function to get all enrollments for a specific course
const getAllEnrollmentForCourse = async (courseId) => {
  try {
    const enrollments = await StudentEnrollment.find({ courseId });
    return enrollments;
  } catch (error) {
    throw error;
  }
};

// Service function to unenroll a student from a course
const unenrollStudentFromCourse = async (enrollmentId) => {
  try {
    await StudentEnrollment.findByIdAndDelete(enrollmentId);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  enrollStudentInCourse,
  getStudentEnrollment,
  getAllEnrollmentForCourse,
  unenrollStudentFromCourse,
};
