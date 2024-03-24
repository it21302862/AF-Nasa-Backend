const express = require("express");
const router = express.Router();
const {
    addAnnouncement,
    removeAnnouncement,getAllNotifications
} = require("../controller/notificationController");
const verifyToken = require("../middleware/UserMiddleware");
const AdminAccess = require("../AccessManager/AdminAccess");
const AllAccess = require("../AccessManager/AllAccess");

//routes for notifications
router.post("/",verifyToken,AdminAccess, addAnnouncement);
router.get("/",verifyToken,AllAccess, getAllNotifications);
router.delete("/:announcementId",verifyToken,AdminAccess, removeAnnouncement);

module.exports = router;
