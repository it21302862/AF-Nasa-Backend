const {
  createTimetable,
  addSessionToTimetable,
  getCourseTimetable,
  removeSessionFromtimetable,
  getTimetableNotifications,
  removeTimetableById,
} = require("../../controller/timetableController");

const timetableService = require("../../service/timetableService");

jest.mock("../../service/timetableService");

describe("Timetable Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test cases for createTimetable function
  describe("createTimetable", () => {
    it("should create a new timetable", async () => {
      const req = {
        body: {
          /* timetable data */
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const timetable = {
        /* created timetable */
      };
      timetableService.createTimetable.mockResolvedValue(timetable);

      await createTimetable(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(timetable);
    });

    it("should handle errors when creating a timetable", async () => {
      const req = {
        body: {
          /* timetable data */
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const errorMessage = "Failed to create timetable";
      timetableService.createTimetable.mockRejectedValue(
        new Error(errorMessage)
      );

      await createTimetable(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });

  // Test cases for addSessionToTimetable function
  describe("addSessionToTimetable", () => {
    it("should add a session to the timetable", async () => {
      const req = {
        body: {
          timetableId: "timetableId",
          sessionId: "sessionId",
          facultyId: "facultyId",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const timetable = {
        /* updated timetable */
      };
      const notificationMessage = "Session added successfully";
      timetableService.addSessionToTimetable.mockResolvedValue({
        timetable,
        notificationMessage,
      });

      await addSessionToTimetable(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ timetable, notificationMessage });
    });

    it("should handle errors when adding a session to the timetable", async () => {
      const req = {
        body: {
          timetableId: "timetableId",
          sessionId: "sessionId",
          facultyId: "facultyId",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const errorMessage = "Failed to add session to timetable";
      timetableService.addSessionToTimetable.mockRejectedValue(
        new Error(errorMessage)
      );

      await addSessionToTimetable(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });

  // Test cases for getCourseTimetable function
  describe("getCourseTimetable", () => {
    it("should get the timetable for a course", async () => {
      const req = {
        params: { courseId: "courseId" },
        user: { userId: "userId", role: "role" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const timetable = {
        /* timetable for the course */
      };
      timetableService.getCourseTimetable.mockResolvedValue(timetable);

      await getCourseTimetable(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(timetable);
    });

    it("should handle errors when getting the timetable for a course", async () => {
      const req = {
        params: { courseId: "courseId" },
        user: { userId: "userId", role: "role" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const errorMessage = "Failed to get timetable for the course";
      timetableService.getCourseTimetable.mockRejectedValue(
        new Error(errorMessage)
      );

      await getCourseTimetable(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });

  // Test cases for removeSessionFromtimetable function
  describe("removeSessionFromtimetable", () => {
    it("should remove a session from the timetable", async () => {
      const req = {
        params: { timetableId: "timetableId", sessionId: "sessionId" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const timetable = {
        /* updated timetable */
      };
      const notificationMessage = "Session removed successfully";
      timetableService.removeSessionFromtimetable.mockResolvedValue({
        timetable,
        notificationMessage,
      });

      await removeSessionFromtimetable(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([
        "Remove session from timetable successfully",
        notificationMessage,
      ]);
    });

    it("should handle errors when removing a session from the timetable", async () => {
      const req = {
        params: { timetableId: "timetableId", sessionId: "sessionId" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const errorMessage = "Failed to remove session from timetable";
      timetableService.removeSessionFromtimetable.mockRejectedValue(
        new Error(errorMessage)
      );

      await removeSessionFromtimetable(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });

  // Test cases for getTimetableNotifications function
  describe("getTimetableNotifications", () => {
    it("should get timetable notifications", async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const notifications = [
        {
          /* notification data */
        },
      ];
      timetableService.getTimetableNotifications.mockResolvedValue(
        notifications
      );

      await getTimetableNotifications(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(notifications);
    });

    it("should handle errors when getting timetable notifications", async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const errorMessage = "Failed to get timetable notifications";
      timetableService.getTimetableNotifications.mockRejectedValue(
        new Error(errorMessage)
      );

      await getTimetableNotifications(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });

  // Test cases for removeTimetableById function
  describe("removeTimetableById", () => {
    it("should remove a timetable by its ID", async () => {
      const req = { params: { timetableId: "timetableId" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const result = { message: "Timetable removed successfully" };
      timetableService.removeTimetableById.mockResolvedValue(result);

      await removeTimetableById(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(result);
    });

    it("should handle errors when removing a timetable by its ID", async () => {
      const req = { params: { timetableId: "timetableId" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const errorMessage = "Failed to remove timetable";
      timetableService.removeTimetableById.mockRejectedValue(
        new Error(errorMessage)
      );

      await removeTimetableById(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });
});
