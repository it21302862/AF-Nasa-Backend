const Session = require('../model/sessionModel');

const createSession = async (sessionData) => {
    try {
        // Check if there is any existing session that conflicts with the new session
        const existingSession = await Session.findOne({
            dayOfWeek: sessionData.dayOfWeek,
            $or: [
                { $and: [{ startTime: { $lte: sessionData.startTime } }, { endTime: { $gt: sessionData.startTime } }] },
                { $and: [{ startTime: { $lt: sessionData.endTime } }, { endTime: { $gte: sessionData.endTime } }] },
                { $and: [{ startTime: { $gte: sessionData.startTime } }, { endTime: { $lte: sessionData.endTime } }] }
            ],
            classRoomId: sessionData.classRoomId
        });

        if (existingSession) {
            const conflictMessage = `Conflict with existing session: Day: ${existingSession.dayOfWeek}, Start Time: ${existingSession.startTime}, End Time: ${existingSession.endTime}, Room ID: ${existingSession.classRoomId}`;
            throw new Error(conflictMessage);
        }

        // Create the new session
        const session = await Session.create(sessionData);
        return session;
    } catch (error) {
        throw error;
    }
};

const getAllSessions = async () => {
    try {
        const sessions = await Session.find();
        return sessions;
    } catch (error) {
        throw error;
    }
};

const updateSession = async (sessionId, sessionData) => {
    try {
        const updatedSession = await Session.findByIdAndUpdate(sessionId, sessionData, { new: true });
        return updatedSession;
    } catch (error) {
        throw error;
    }
};

const deleteSession = async (sessionId) => {
    try {
        await Session.findByIdAndDelete(sessionId);
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createSession,
    getAllSessions,
    updateSession,
    deleteSession
};
