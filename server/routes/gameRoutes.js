const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

router.post('/init', gameController.initializeGame);
router.post('/guess', gameController.makeGuess);

module.exports = router;
