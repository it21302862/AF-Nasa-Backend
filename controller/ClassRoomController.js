const classRoomService = require("../service/ClassRoomService");

async function createClassRoom(req, res) {
    try {
      // Getting the current user's role from the request object
    //   const currentUserRole = req.user?.role;
  
      // Checking if the current user is an admin
    //   if (currentUserRole !== 0) {
    //     throw new Error("Only admin can create new courses");
    //   }
      const classRoomData = req.body;
      const classRoom = await classRoomService.createClassRoom(classRoomData);
      res.status(201).json({ message: "Successfully created class room", classRoom });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Function to get all classrroms
async function getClassRooms(req, res) {
  try {
    // // Getting the current user's role from the request object
    // const currentUserRole = req.user?.role;

    // // Checking if the current user is an admin or student or faculty member
    // if (
    //   currentUserRole !== 0 &&
    //   currentUserRole !== 1 &&
    //   currentUserRole !== 2
    // ) {
    //   throw new Error(
    //     `Only students ,admin and faculty member can get courses.`
    //   );
    // }

    const classRoom = await classRoomService.getClassRooms();
    res.status(200).json(classRoom);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getClassRoomById(req, res) {
  try {
      const { classRoomId } = req.params;
      const classRoom = await classRoomService.getClassRoomById(classRoomId);
      res.status(200).json(classRoom);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
}


  module.exports = {
createClassRoom,
getClassRooms,getClassRoomById
  };