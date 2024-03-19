const {ClassRoom} = require("../model/ClassRoom");

async function createClassRoom(classRoomData) {
  try {
      const classRoom = await ClassRoom.create(classRoomData);
      return classRoom;
  } catch (error) {
      if (error.code === 11000) { // Duplicate key error
          throw new Error("Classroom code already exists. Please choose a different code.");
      }
      throw error;
  }
}


  async function getClassRooms() {
    try {
      const classRoom = await ClassRoom.find().populate(
        "code capacity"
      );
      return classRoom;
    } catch (error) {
      throw error;
    }
  }

  async function getClassRoomById(classRoomId) {
    try {
        const classRoom = await ClassRoom.findById(classRoomId).populate(
            "bookedDates",
            "date timeSlots"
        );
        if (!classRoom) {
            throw new Error("Classroom not found");
        }
        return classRoom;
    } catch (error) {
        throw error;
    }
}

  module.exports = {
    createClassRoom,
    getClassRooms,getClassRoomById
  };