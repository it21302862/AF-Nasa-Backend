const studentEnrollmentService = require('../service/studentEnrollmentService');

const enrollStudentInCourse = async (req,res,next) =>{
    try{
        const {studentId, courseId} = req.body;

        const enrollment = await studentEnrollmentService.enrollStudentInCourse(studentId,courseId);
        res.status(201).json(['Enroll for course Succesfully',enrollment]);
    }catch(error){
        next(error);
    }
};

const getStudentEnrollments = async(req,res,next) =>{
    try{
        const {studentId} = req.params;
        const enrollments = await studentEnrollmentService.getStudentEnrollment(studentId);
        res.status(200).json(enrollments);
    }catch(error){
        next(error);
    }
};

const getAllEnrollmentForCourse = async(req,res,next) =>{
    try{
        const {courseId} = req.params;
        const enrollments = await studentEnrollmentService.getAllEnrollmentForCourse(courseId);
        res.status(200).json(enrollments);
    }catch(error){
        next(error);
    }
}
module.exports = {
    enrollStudentInCourse,
    getStudentEnrollments,
    getAllEnrollmentForCourse
}