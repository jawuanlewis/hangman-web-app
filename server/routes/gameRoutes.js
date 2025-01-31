const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');
const sessionController = require('../controllers/sessionController');

router.post('/init', gameController.initializeGame);
router.get('/curr', gameController.getCurrentGame);
router.post('/guess', gameController.makeGuess);
router.post('/reset', sessionController.resetSession);

module.exports = router;
