const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

router.post('/init', gameController.initializeGame);
router.get('/curr', gameController.getCurrentGame);
router.post('/guess', gameController.makeGuess);

module.exports = router;
