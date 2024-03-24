const sessionService = require("../service/sessionService");

// Controller function to create a new session
const createSession = async (req, res, next) => {
  try {
    const sessionData = req.body;
    const session = await sessionService.createSession(sessionData);
    res.status(201).json(session);
  } catch (error) {
    next(error);
  }
};

// Controller function to get all sessions
const getAllSessions = async (req, res, next) => {
  try {
    const sessions = await sessionService.getAllSessions();
    res.status(200).json(sessions);
  } catch (error) {
    next(error);
  }
};

// Controller function to get sessions by class room ID
const getSessionByClassRoomId = async (req, res, next) => {
  try {
    const classRoomId = req.params.classRoomId;
    const sessions = await sessionService.getSessionByClassRoomId(classRoomId);

    if (!sessions) {
      return res.status(404).json({ error: "Session not found" });
    }

    res.status(200).json(sessions);
  } catch (error) {
    next(error);
  }
};

// Function to get all available sessions
const getAvailableSessions = async (req, res, next) => {
  try {
    const availableSessions = await sessionService.getAvailableSessions();
    res.status(200).json(availableSessions);
  } catch (error) {
    next(error);
  }
};

// Function to get all booked sessions
const getBookedSessions = async (req, res, next) => {
  try {
    const bookedSessions = await sessionService.getBookedSessions();
    res.status(200).json(bookedSessions);
  } catch (error) {
    next(error);
  }
};

// Controller function to update a session
const updateSession = async (req, res, next) => {
  try {
    const sessionId = req.params.id;
    const sessionData = req.body;
    const updatedSession = await sessionService.updateSession(
      sessionId,
      sessionData
    );

    if (!updatedSession) {
      return res.status(404).json({ error: "Session not found" });
    }

    res.status(200).json(updatedSession);
  } catch (error) {
    next(error);
  }
};

// Controller function to delete a session
const deleteSession = async (req, res, next) => {
  try {
    const sessionId = req.params.id;
    const deletedSession = await sessionService.deleteSession(sessionId);

    res.status(200).json({ message: "Session removed successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createSession,
  getAllSessions,
  getSessionByClassRoomId,
  getAvailableSessions,
  getBookedSessions,
  updateSession,
  deleteSession,
};
