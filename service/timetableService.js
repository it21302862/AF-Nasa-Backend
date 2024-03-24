const Timetable = require("../model/timetableModel");
const Session = require("../model/sessionModel");
const StudentEnrollment = require("../model/studentEnrollmentModel");
const Course = require("../model/courseModel");
const Notification = require("../model/notificationModel");

// Function to create a new timetable
const createTimetable = async (timetableData) => {
  try {
    // Check if a timetable already exists for the course
    const existingTimetable = await Timetable.findOne({
      courseId: timetableData.courseId,
    });
    if (existingTimetable) {
      throw new Error("A timetable already exists for this course");
    }

    const timetable = await Timetable.create(timetableData);
    // Fetch course details
    const course = await Course.findById(timetableData.courseId);
    if (!course) {
      throw new Error("Course not found");
    }

    const notificationMessage = `New Timetable created for course ${course.code}`;
    await Notification.create({
      message: notificationMessage,
      courseId: timetable.courseId,
    });
    return { timetable, notificationMessage };
  } catch (error) {
    throw error;
  }
};

// Function to add a session to a timetable
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

    // Fetch course details
    const course = await Course.findById(timetable.courseId);
    if (!course) {
      throw new Error("Course not found");
    }
    // Generate notification message
    const notificationMessage = `Timetable session added for course ${course.code}`;

    await Notification.create({
      message: notificationMessage,
      courseId: timetable.courseId,
    });

    return { timetable, notificationMessage };
  } catch (error) {
    throw error;
  }
};

// Function to get the timetable for a course
const getCourseTimetable = async (courseId, userId, role) => {
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

    // If user is not a student, return course details
    if (role !== 2) {
      return { timetable, course };
    }

    const enrollment = await StudentEnrollment.findOne({
      studentId: userId,
      courseId: courseId,
    });
    if (!enrollment) {
      throw new Error("You are not enrolled in this course.");
    }

    return { timetable, course };
  } catch (error) {
    throw error;
  }
};

// Function to remove a session from a timetable
const removeSessionFromtimetable = async (timetableId, sessionId) => {
  try {
    const timetable = await Timetable.findById(timetableId);

    if (!timetable) {
      throw new Error("Timetable not found");
    }

    // remove the session from the
    // Find the index of the session with the given sessionId
    const index = timetable.sessions.findIndex(
      (sessionObj) => sessionObj.session.toString() === sessionId
    );

    if (index === -1) {
      throw new Error("Session not found in timetable");
    }

    timetable.sessions.splice(index, 1);

    // update isBooked filed to false for session
    await Session.findByIdAndUpdate(sessionId, { isBooked: false });

    const course = await Course.findById(timetable.courseId);
    if (!course) {
      throw new Error("Course not found");
    }

    // Generate notification message
    const notificationMessage = `Timetable session removed for course ${course.code}`;

    // Update timetable with notification
    timetable.notifications.push({ message: notificationMessage });
    await timetable.save();

    return { timetable, notificationMessage };
  } catch (error) {
    throw error;
  }
};

// Function to remove a timetable by its ID
async function removeTimetableById(timetableId) {
  try {
    const timetable = await Timetable.findByIdAndDelete(timetableId);
    if (!timetable) {
      throw new Error("Timetable not found");
    }
    return { message: "Timetable removed successfully" };
  } catch (error) {
    throw error;
  }
}

// Function to get all timetable notifications
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
  removeSessionFromtimetable,
  getTimetableNotifications,
  removeTimetableById,
};
