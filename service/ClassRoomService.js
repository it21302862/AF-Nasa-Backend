const { ClassRoom } = require("../model/ClassRoom");

// Function to create a new classroom
async function createClassRoom(classRoomData) {
  try {
    const classRoom = await ClassRoom.create(classRoomData);
    return { message: "Closs Room addded successfully", classRoom };
  } catch (error) {
    // Handling duplicate error for unique fields
    if (error.code === 11000) {
      throw new Error(
        "Classroom code already exists. Please choose a different code."
      );
    }
    throw error;
  }
}

// Function to get all classrooms
async function getClassRooms() {
  try {
    const classRoom = await ClassRoom.find().populate("code location capacity");
    return classRoom;
  } catch (error) {
    throw error;
  }
}

// Function to get a classroom by ID
async function getClassRoomById(classRoomId) {
  try {
    const classRoom = await ClassRoom.findById(classRoomId).populate(
      "code",
      "capacity"
    );

    //If classroom is not found, throw an error
    if (!classRoom) {
      throw new Error("Classroom not found");
    }
    return classRoom;
  } catch (error) {
    throw error;
  }
}

// Function to update a classroom by ID
async function updateClassRoom(classRoomId, classRoomData) {
  try {
    const updatedClassRoom = await ClassRoom.findByIdAndUpdate(
      classRoomId,
      classRoomData,
      { new: true }
    );

    //If classroom is not found, throw an error
    if (!updatedClassRoom) {
      throw new Error("Classroom not found");
    }
    return { message: "Classroom updated successfully" };
  } catch (error) {
    throw error;
  }
}

// Function to delete a classroom by ID
async function deleteClassRoom(classRoomId) {
  try {
    const deletedClassRoom = await ClassRoom.findByIdAndDelete(classRoomId);

    //If classroom is not found, throw an error
    if (!deletedClassRoom) {
      throw new Error("Classroom not found");
    }
    return { message: "Classroom deleted successfully" };
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createClassRoom,
  getClassRooms,
  getClassRoomById,
  updateClassRoom,
  deleteClassRoom,
};
