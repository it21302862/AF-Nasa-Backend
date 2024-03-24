const mongoose = require('mongoose');

// Define the schema for a timetable
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
    }],
    notifications: [{
        message: String,
        timestamp: {
            type: Date,
            default: Date.now
        }
    }]
});

module.exports = mongoose.model('Timetable', timetableSchema);