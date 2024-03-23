// notificationRoute.js

const express = require("express");
const router = express.Router();
const {
    addAnnouncement,
    removeAnnouncement,getAllNotifications
} = require("../controller/notificationController");

router.post("/", addAnnouncement);
router.get("/", getAllNotifications);
router.delete("/:announcementId", removeAnnouncement);

module.exports = router;
