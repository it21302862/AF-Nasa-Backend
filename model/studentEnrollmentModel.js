const mongoose = require('mongoose');

const studentEnrollmentSchema = new mongoose.Schema({
    studentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    courseId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course",
        required:true
    }
});

module.exports = mongoose.model('StudentEnrollment',studentEnrollmentSchema);