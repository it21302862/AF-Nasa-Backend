const express = require("express");
const router = express.Router();
const {
  createSession,
  getAllSessions,
  getSessionByClassRoomId,
  getAvailableSessions,
  getBookedSessions,
  updateSession,
  deleteSession,
} = require("../controller/sessionController");
const verifyToken = require("../middleware/UserMiddleware");
const AdminAccess = require("../AccessManager/AdminAccess");
const AdminFacultyAccess = require("../AccessManager/AdminFacultyAccess");

// Route to session
router.post("/", verifyToken, AdminAccess, createSession);
router.get("/", verifyToken, AdminFacultyAccess, getAllSessions);
router.get("/classroom/:classRoomId", verifyToken, getSessionByClassRoomId);
router.get("/available", verifyToken, AdminFacultyAccess, getAvailableSessions);
router.get("/booked", verifyToken, AdminFacultyAccess, getBookedSessions);
router.put("/:id", verifyToken, AdminAccess, updateSession);
router.delete("/:id", verifyToken, AdminAccess, deleteSession);

module.exports = router;
