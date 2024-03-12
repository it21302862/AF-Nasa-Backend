// route.js
const express = require('express');
const router = express.Router();
const roomController = require('../controller/RoomController');

router.post('/', roomController.createRoom);
router.get('/', roomController.getAllRooms);

module.exports = router;
