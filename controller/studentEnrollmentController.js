const studentEnrollmentService = require("../service/studentEnrollmentService");

// Controller function to enroll a student in a course
const enrollStudentInCourse = async (req, res, next) => {
  try {
    const { studentId, courseId } = req.body;

    const enrollment = await studentEnrollmentService.enrollStudentInCourse(
      studentId,
      courseId
    );
    res.status(201).json(["Enroll for course Succesfully", enrollment]);
  } catch (error) {
    next(error);
  }
};

// Controller function to get all enrollments for a student
const getStudentEnrollments = async (req, res, next) => {
  try {
    const { studentId } = req.params;
    const enrollments = await studentEnrollmentService.getStudentEnrollment(
      studentId
    );
    res.status(200).json(enrollments);
  } catch (error) {
    next(error);
  }
};

// Controller function to get all enrollments for a course
const getAllEnrollmentForCourse = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const enrollments =
      await studentEnrollmentService.getAllEnrollmentForCourse(courseId);
    res.status(200).json(enrollments);
  } catch (error) {
    next(error);
  }
};

// Controller function to unenroll a student from a course
const unenrollStudentFromCourse = async (req, res, next) => {
  try {
    const enrollmentId = req.params.enrollmentId;
    await studentEnrollmentService.unenrollStudentFromCourse(enrollmentId);
    res.status(200).json({ message: "Student unenrolled successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  enrollStudentInCourse,
  getStudentEnrollments,
  getAllEnrollmentForCourse,
  unenrollStudentFromCourse,
};
