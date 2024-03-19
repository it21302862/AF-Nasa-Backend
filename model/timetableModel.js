const mongoose = require('mongoose');

const timetableSchema = new mongoose.Schema({
    courseId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Course'   ,
        required:true
    },
    sessions:[{
        session:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Session'
        },
        faculty:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    }]
});

module.exports = mongoose.model('Timetable', timetableSchema);