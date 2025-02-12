import express from 'express';
import gameController from '../controllers/gameController.js';
import sessionController from '../controllers/sessionController.js';

const router = express.Router();

router.post('/init', gameController.initializeGame);
router.get('/curr', gameController.getCurrentGame);
router.post('/guess', gameController.makeGuess);
router.post('/reset', sessionController.resetSession);

export default router;
