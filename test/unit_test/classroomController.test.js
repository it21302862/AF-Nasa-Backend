const {
  createClassRoom,
  getClassRooms,
  getClassRoomById,
  updateClassRoom,
  deleteClassRoom,
} = require("../../controller/ClassRoomController");

const classRoomService = require("../../service/ClassRoomService");

jest.mock("../../service/ClassRoomService");

describe("Classroom Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("createClassRoom", () => {
    // Test cases for createClassRoom function
    it("should create a new classroom", async () => {
      const req = {
        body: { code: "CR101", location: "Building A", capacity: 30 },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockCreatedClassRoom = {
        _id: "123",
        code: "CR101",
        location: "Building A",
        capacity: 30,
      };
      classRoomService.createClassRoom.mockResolvedValue({
        message: "Classroom added successfully",
        classRoom: mockCreatedClassRoom,
      });

      await createClassRoom(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
    });

    it("should handle errors when creating a classroom", async () => {
      const req = {
        body: { code: "CR101", location: "Building A", capacity: 30 },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const errorMessage = "Failed to create classroom";
      classRoomService.createClassRoom.mockRejectedValue(
        new Error(errorMessage)
      );

      await createClassRoom(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });

  // Test cases for getClassRooms function
  describe("getClassRooms", () => {
    it("should get all classrooms", async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockClassRooms = [
        { _id: "1", code: "CR101", location: "Building A", capacity: 30 },
        { _id: "2", code: "CR102", location: "Building B", capacity: 25 },
      ];
      classRoomService.getClassRooms.mockResolvedValue(mockClassRooms);

      await getClassRooms(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockClassRooms);
    });

    it("should handle errors when getting classrooms", async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const errorMessage = "Failed to get classrooms";
      classRoomService.getClassRooms.mockRejectedValue(new Error(errorMessage));

      await getClassRooms(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });

  // Test cases for getClassRoomById function
  describe("getClassRoomById", () => {
    it("should get a classroom by ID", async () => {
      const classRoomId = "123";
      const req = { params: { classRoomId } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockClassRoom = {
        _id: classRoomId,
        code: "CR101",
        location: "Building A",
        capacity: 30,
      };
      classRoomService.getClassRoomById.mockResolvedValue(mockClassRoom);

      await getClassRoomById(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockClassRoom);
    });

    it("should handle errors when getting a classroom by ID", async () => {
      const classRoomId = "123";
      const req = { params: { classRoomId } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const errorMessage = "Failed to get classroom by ID";
      classRoomService.getClassRoomById.mockRejectedValue(
        new Error(errorMessage)
      );

      await getClassRoomById(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });

  // Test cases for updateClassRoom function
  describe("updateClassRoom", () => {
    it("should update a classroom by ID", async () => {
      const classRoomId = "123";
      const updatedClassRoomData = { location: "Building B", capacity: 40 };
      const req = { params: { classRoomId }, body: updatedClassRoomData };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      classRoomService.updateClassRoom.mockResolvedValue({
        message: "Classroom updated successfully",
      });

      await updateClassRoom(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith("Classroom updated successfully");
    });

    it("should handle errors when updating a classroom by ID", async () => {
      const classRoomId = "123";
      const updatedClassRoomData = { location: "Building B", capacity: 40 };
      const req = { params: { classRoomId }, body: updatedClassRoomData };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const errorMessage = "Failed to update classroom";
      classRoomService.updateClassRoom.mockRejectedValue(
        new Error(errorMessage)
      );

      await updateClassRoom(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });

  // Test cases for deleteClassRoom function
  describe("deleteClassRoom", () => {
    it("should delete a classroom by ID", async () => {
      const classRoomId = "123";
      const req = { params: { classRoomId } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      classRoomService.deleteClassRoom.mockResolvedValue({
        message: "Classroom deleted successfully",
      });

      await deleteClassRoom(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith("Classroom deleted successfully");
    });

    it("should handle errors when deleting a classroom by ID", async () => {
      const classRoomId = "123";
      const req = { params: { classRoomId } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const errorMessage = "Failed to delete classroom";
      classRoomService.deleteClassRoom.mockRejectedValue(
        new Error(errorMessage)
      );

      await deleteClassRoom(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });
});
