const express = require('express');
const router = express.Router();
const sessionController = require('../controller/sessionController');

router.post('/', sessionController.createSession);
router.get('/', sessionController.getAllSessions);
router.put('/:id', sessionController.updateSession);
router.delete('/:id', sessionController.deleteSession);

module.exports = router;
