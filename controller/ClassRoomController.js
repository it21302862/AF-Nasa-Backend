const classRoomService = require("../service/ClassRoomService");

// Function to create a new classroom
async function createClassRoom(req, res) {
  try {
    const classRoomData = req.body;
    const classRoom = await classRoomService.createClassRoom(classRoomData);
    res.status(201).json({ classRoom });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Function to get all classrroms
async function getClassRooms(req, res) {
  try {
    const classRoom = await classRoomService.getClassRooms();
    res.status(200).json(classRoom);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Function to get a classroom by ID
async function getClassRoomById(req, res) {
  try {
    const { classRoomId } = req.params;
    const classRoom = await classRoomService.getClassRoomById(classRoomId);
    res.status(200).json(classRoom);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Function to update a classroom by ID
async function updateClassRoom(req, res) {
  try {
    const { classRoomId } = req.params;
    const classRoomData = req.body;
    const result = await classRoomService.updateClassRoom(
      classRoomId,
      classRoomData
    );
    res.status(200).json(result.message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Function to delete a classroom by ID
async function deleteClassRoom(req, res) {
  try {
    const { classRoomId } = req.params;
    const result = await classRoomService.deleteClassRoom(classRoomId);
    res.status(200).json(result.message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createClassRoom,
  getClassRooms,
  getClassRoomById,
  updateClassRoom,
  deleteClassRoom,
};
