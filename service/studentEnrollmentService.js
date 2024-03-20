const StudentEnrollment = require('../model/studentEnrollmentModel'); 

const enrollStudentInCourse = async (studentId,courseId) => {
    try{
        const enrollment = await StudentEnrollment.create({studentId,courseId});
        return enrollment;
    }catch(error){
        throw error;
    }
};

const getStudentEnrollment = async(studentId) =>{
    try{
        const enrollment = await StudentEnrollment.findOne({studentId});
        return enrollment;
    }catch(error){
        throw error;
    }
}

const getAllEnrollmentForCourse = async(courseId) =>{
    try{
        const enrollments = await StudentEnrollment.find({courseId});
        return enrollments;
    }catch(error){
        throw error;
    }
}
module.exports = {enrollStudentInCourse,getStudentEnrollment,getAllEnrollmentForCourse};