const { getRandomWord } = require("../config/db");

const gameController = {
  initializeGame: async (req, res) => {
    try {
      const { level } = req.body;
      const answer = await getRandomWord(level.toLowerCase());
      
      req.session.level = level;
      req.session.attempts = 6;
      req.session.answer = answer;
      req.session.currentProgress = answer
        .split("")
        .map((char) => (char === " " ? " " : "_"))
        .join("");
      req.session.gameOver = false;
      
      res.json({
        level: req.session.level,
        attempts: req.session.attempts,
        currentProgress: req.session.currentProgress,
        gameOver: false
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to initialize game" });
    }
  },

  makeGuess: async (req, res) => {
    try {
      const { letter } = req.body;
      const answer = req.session.answer;
      let currentProgress = req.session.currentProgress;

      let updatedProgress = "";
      for (let i = 0; i < answer.length; i++) {
        if (answer[i] === letter) {
          updatedProgress += answer[i];
        } else {
          updatedProgress += currentProgress[i];
        }
      }

      if (updatedProgress === currentProgress) {
        req.session.attempts -= 1;
      }
      req.session.currentProgress = updatedProgress;

      let gameState = {
        level: req.session.level,
        attempts: req.session.attempts,
        currentProgress: req.session.currentProgress,
        gameOver: false
      };

      if (req.session.attempts <= 0 || updatedProgress === answer) {
        gameState = {
          ...gameState,
          currentProgress: answer,
          gameOver: true
        };
      }

      res.json(gameState);
    } catch (error) {
      res.status(500).json({ error: "Failed to process guess" });
    }
  }
};

module.exports = gameController;
