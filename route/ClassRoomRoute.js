const express = require("express");
const router = express.Router();
const {
createClassRoom,getClassRooms,getClassRoomById
  } = require("../controller/ClassRoomController");

  router.post("/", createClassRoom);
  router.get("/", getClassRooms);
  router.get("/:classRoomId", getClassRoomById);

  module.exports = router;