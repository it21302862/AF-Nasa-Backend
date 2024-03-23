const Timetable = require("../model/timetableModel");
const Session = require("../model/sessionModel");
const Course = require("../model/Course");
const Notification = require("../model/notificationModel");

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
  

     // Generate notification message
     const notificationMessage = `Timetable session added for course ${timetable.courseId}`;

     await Notification.create({ message: notificationMessage, courseId: timetable.courseId });

     return { timetable, notificationMessage };
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
            select: "code", // Include name and capacity fields for the classRoom
          },
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

const removeSessionFromtimetable = async (timetableId,sessionId) => {
  try {
    const timetable = await Timetable.findById(timetableId);

    if (!timetable) {
      throw new Error("Timetable not found");
    }

    // remove the session from the
    // Find the index of the session with the given sessionId
    const index = timetable.sessions.findIndex(sessionObj => sessionObj.session.toString() === sessionId);

    if (index === -1) {
      throw new Error("Session not found in timetable");
    }

    timetable.sessions.splice(index, 1);

    // update isBooked filed to false for session
    await Session.findByIdAndUpdate(sessionId, { isBooked: false });
    
    // Generate notification message
    const notificationMessage = `Timetable session removed for course ${timetable.courseId}`;

    // Update timetable with notification
    timetable.notifications.push({ message: notificationMessage });
    await timetable.save();

    return { timetable, notificationMessage };
  } catch (error) {
    throw error;
  }
};

const getTimetableNotifications = async () => {
  try {
      const timetable = await Timetable.find({});

      if (!timetable) {
          throw new Error("Timetable not found for the course");
      }

      // Retrieve notifications from the timetable
      const notifications = timetable.notifications;

      return notifications;
  } catch (error) {
      throw error;
  }
};


module.exports = {
  createTimetable,
  addSessionToTimetable,
  getCourseTimetable,
  removeSessionFromtimetable,getTimetableNotifications
};
