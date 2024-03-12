// service.js
const Room = require('../model/Room');

async function insertRoom(roomData) {
  try {
    const room = new Room(roomData);
    await room.save();
    return room;
  } catch (error) {
    throw error;
  }
}

async function getRooms() {
  try {
    const rooms = await Room.find();
    return rooms;
  } catch (error) {
    throw error;
  }
}

module.exports = { insertRoom, getRooms };
