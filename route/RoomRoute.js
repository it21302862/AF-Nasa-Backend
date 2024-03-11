// route.js
const express = require('express');
const router = express.Router();
const roomController = require('../controller/RoomController');

router.post('/rooms', roomController.createRoom);
router.get('/rooms', roomController.getAllRooms);

module.exports = router;
