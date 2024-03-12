// controller.js
const roomService = require('../service/RoomService');

async function createRoom(req, res) {
  try {
    const room = await roomService.insertRoom(req.body);
    res.status(201).json(room);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getAllRooms(req, res) {
  try {
    const rooms = await roomService.getRooms();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { createRoom, getAllRooms };
