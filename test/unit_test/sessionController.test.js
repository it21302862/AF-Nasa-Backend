const {
  createSession,
  getAllSessions,
  getSessionByClassRoomId,
  getAvailableSessions,
  getBookedSessions,
  updateSession,
  deleteSession,
} = require("../../controller/sessionController");

const sessionService = require("../../service/sessionService");

jest.mock("../../service/sessionService");

describe("Session Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test cases for createSession function
  describe("createSession", () => {
    it("should create a new session", async () => {
      const req = {
        body: {
          dayOfWeek: "Monday",
          startTime: "9:00 AM",
          endTime: "10:00 AM",
          classRoomId: "123",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockSession = {
        _id: "123",
        dayOfWeek: "Monday",
        startTime: "9:00 AM",
        endTime: "10:00 AM",
        classRoomId: "123",
      };
      sessionService.createSession.mockResolvedValue(mockSession);

      await createSession(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockSession);
    });

    it("should handle errors when creating a session", async () => {
      const req = {
        body: {
          dayOfWeek: "Monday",
          startTime: "9:00 AM",
          endTime: "10:00 AM",
          classRoomId: "123",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const errorMessage = "Failed to create session";
      sessionService.createSession.mockRejectedValue(new Error(errorMessage));

      await createSession(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });

  // Test cases for getAllSessions function
  describe("getAllSessions", () => {
    it("should get all sessions", async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockSessions = [
        {
          _id: "123",
          dayOfWeek: "Monday",
          startTime: "9:00 AM",
          endTime: "10:00 AM",
          classRoomId: "123",
        },
      ];
      sessionService.getAllSessions.mockResolvedValue(mockSessions);

      await getAllSessions(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockSessions);
    });

    it("should handle errors when getting all sessions", async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const errorMessage = "Failed to get sessions";
      sessionService.getAllSessions.mockRejectedValue(new Error(errorMessage));

      await getAllSessions(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });

  // Test cases for getSessionByClassRoomId function
  describe("getSessionByClassRoomId", () => {
    it("should get sessions by class room ID", async () => {
      const req = { params: { classRoomId: "123" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockSessions = [
        {
          _id: "123",
          dayOfWeek: "Monday",
          startTime: "9:00 AM",
          endTime: "10:00 AM",
          classRoomId: "123",
        },
      ];
      sessionService.getSessionByClassRoomId.mockResolvedValue(mockSessions);

      await getSessionByClassRoomId(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockSessions);
    });

    it("should handle errors when getting sessions by class room ID", async () => {
      const req = { params: { classRoomId: "123" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const errorMessage = "Failed to get sessions by class room ID";
      sessionService.getSessionByClassRoomId.mockRejectedValue(
        new Error(errorMessage)
      );

      await getSessionByClassRoomId(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });

  // Test cases for getAvailableSessions function
  describe("getAvailableSessions", () => {
    it("should get all available sessions", async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockAvailableSessions = [{ _id: "123", isBooked: false }];
      sessionService.getAvailableSessions.mockResolvedValue(
        mockAvailableSessions
      );

      await getAvailableSessions(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockAvailableSessions);
    });

    it("should handle errors when getting available sessions", async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const errorMessage = "Failed to get available sessions";
      sessionService.getAvailableSessions.mockRejectedValue(
        new Error(errorMessage)
      );

      await getAvailableSessions(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });

  // Test cases for getBookedSessions function
  describe("getBookedSessions", () => {
    it("should get all booked sessions", async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockBookedSessions = [{ _id: "456", isBooked: true }];
      sessionService.getBookedSessions.mockResolvedValue(mockBookedSessions);

      await getBookedSessions(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockBookedSessions);
    });

    it("should handle errors when getting booked sessions", async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const errorMessage = "Failed to get booked sessions";
      sessionService.getBookedSessions.mockRejectedValue(
        new Error(errorMessage)
      );

      await getBookedSessions(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });

  // Test cases for updateSession function
  describe("updateSession", () => {
    it("should update a session", async () => {
      const req = {
        params: { id: "123" },
        body: {
          /* updated session data */
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const updatedSession = { _id: "123" /* updated session data */ };
      sessionService.updateSession.mockResolvedValue(updatedSession);

      await updateSession(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(updatedSession);
    });

    it("should handle errors when updating a session", async () => {
      const req = {
        params: { id: "123" },
        body: {
          /* updated session data */
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const errorMessage = "Failed to update session";
      sessionService.updateSession.mockRejectedValue(new Error(errorMessage));

      await updateSession(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });

  // Test cases for deleteSession function
  describe("deleteSession", () => {
    it("should delete a session", async () => {
      const req = { params: { id: "123" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await deleteSession(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Session removed successfully",
      });
    });

    it("should handle errors when deleting a session", async () => {
      const req = { params: { id: "123" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const errorMessage = "Failed to delete session";
      sessionService.deleteSession.mockRejectedValue(new Error(errorMessage));

      await deleteSession(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });
});
