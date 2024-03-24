const express = require("express");
const router = express.Router();
const {
  createClassRoom,
  getClassRooms,
  getClassRoomById,
  updateClassRoom,
  deleteClassRoom,
} = require("../controller/ClassRoomController");
const verifyToken = require("../middleware/UserMiddleware");
const AdminAccess = require("../AccessManager/AdminAccess");
const AllAccess = require("../AccessManager/AllAccess");

// Route for classroom
router.post("/", verifyToken, AdminAccess, createClassRoom);
router.get("/", verifyToken, AllAccess, getClassRooms);
router.get("/:classRoomId", verifyToken, AllAccess, getClassRoomById);
router.put("/:classRoomId", verifyToken, AdminAccess, updateClassRoom);
router.delete("/:classRoomId", verifyToken, AdminAccess, deleteClassRoom);

module.exports = router;
