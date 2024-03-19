const Timetable = require("../model/timetableModel");
const Session = require("../model/sessionModel");
const Course = require("../model/Course");

const createTimetable = async (timetableData) => {
  try {
    const timetable = await Timetable.create(timetableData);
    return timetable;
  } catch (error) {
    throw error;
  }
};

const addSessionToTimetable = async (
  timetableId,
  sessionId,
  facultyMemberId
) => {
  try {
    const timetable = await Timetable.findById(timetableId);

    if (!timetable) {
      throw new Error("Timetable not found");
    }

    if (
      timetable.sessions.some(
        (session) => session.session.toString() === sessionId
      )
    ) {
      throw new Error("Session already added to timetable");
    }

    const session = await Session.findById(sessionId);

    if (!session) {
      throw new Error("Session not found");
    }

    session.isBooked = true;
    await session.save();

    timetable.sessions.push({
      session: sessionId,
      faculty: facultyMemberId,
    });
    await timetable.save();
    return timetable;
  } catch (error) {
    throw error;
  }
};

const getCourseTimetable = async (courseId) => {
  try {
    // Find the timetable for the specified course
    const timetable = await Timetable.findOne({ courseId }).populate({
      path: "sessions",
      populate: [
        {
          path: "session",
          select: "dayOfWeek startTime endTime", // Include only dayOfWeek field
          populate: {
            path: "classRoomId", // Populate the classRoomId field
            select: "code capacity" // Include name and capacity fields for the classRoom
          }
        },
        {
          path: "faculty",
          select: "firstName lastName", // Include only firstName field
        },
        
      ],
    });

    if (!timetable) {
      throw new Error("Timetable not found for the course");
    }

    // Find the course details
    const course = await Course.findById(courseId);

    return { timetable, course };
  } catch (error) {
    throw error;
  }
};

module.exports = { createTimetable, addSessionToTimetable, getCourseTimetable };
