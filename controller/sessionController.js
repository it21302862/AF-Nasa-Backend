const sessionService = require('../service/sessionService');

const createSession = async (req, res, next) => {
    try {
        const sessionData = req.body;
        const session = await sessionService.createSession(sessionData);
        res.status(201).json(session);
    } catch (error) {
        next(error);
    }
};

const getAllSessions = async (req, res, next) => {
    try {
        const sessions = await sessionService.getAllSessions();
        res.status(200).json(sessions);
    } catch (error) {
        next(error);
    }
};

const updateSession = async (req, res, next) => {
    try {
        const sessionId = req.params.id;
        const sessionData = req.body;
        const updatedSession = await sessionService.updateSession(sessionId, sessionData);

        if (!updatedSession) {
            throw new Error('Session not found');
        }

        res.status(200).json(updatedSession);
    } catch (error) {
        next(error);
    }
};

const deleteSession = async (req, res, next) => {
    try {
        const sessionId = req.params.id;
        const deletedSession = await sessionService.deleteSession(sessionId);
        
        if (!deletedSession) {
            throw new Error('Session not found');
        }
        res.status(200).json("removed session successfully");
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createSession,
    getAllSessions,
    updateSession,
    deleteSession
};
