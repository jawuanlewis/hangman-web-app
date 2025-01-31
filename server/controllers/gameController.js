const { getRandomWord } = require('../config/db');

const gameController = {
  initializeGame: async (req, res) => {
    try {
      const { level } = req.body;
      const answer = await getRandomWord(level.toLowerCase());

      req.session.level = level;
      req.session.attempts = 6;
      req.session.answer = answer;
      req.session.currentProgress = answer
        .split('')
        .map((char) => (char === ' ' ? ' ' : '_'))
        .join('');
      req.session.gameOver = false;

      res.json({
        level: req.session.level,
        attempts: req.session.attempts,
        currentProgress: req.session.currentProgress,
        gameOver: req.session.gameOver,
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to initialize game' });
    }
  },

  getCurrentGame: async (req, res) => {
    try {
      res.json({
        level: req.session.level,
        attempts: req.session.attempts,
        currentProgress: req.session.currentProgress,
        gameOver: req.session.gameOver,
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve game session' });
    }
  },

  makeGuess: async (req, res) => {
    try {
      const { letter } = req.body;
      const answer = req.session.answer;
      let currentProgress = req.session.currentProgress;

      let updatedProgress = '';
      for (let i = 0; i < answer.length; i++) {
        if (answer[i] === letter) {
          updatedProgress += answer[i];
        } else {
          updatedProgress += currentProgress[i];
        }
      }

      req.session.currentProgress = updatedProgress;
      if (updatedProgress === currentProgress) {
        req.session.attempts -= 1;
      }
      if (req.session.attempts <= 0 || updatedProgress === answer) {
        req.session.currentProgress = answer;
        req.session.gameOver = true;
      }

      res.json({
        level: req.session.level,
        attempts: req.session.attempts,
        currentProgress: req.session.currentProgress,
        gameOver: req.session.gameOver,
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to process guess' });
    }
  },
};

module.exports = gameController;
