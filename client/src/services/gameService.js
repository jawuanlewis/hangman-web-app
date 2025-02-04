import { resetKeyboardState } from '@/utils/keyboardState';

export const gameService = {
  initGame: async (level) => {
    try {
      const response = await fetch('/api/game/init', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ level }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      resetKeyboardState();

      return await response.json();
    } catch (error) {
      console.error('Error in initGame:', error);
      throw error;
    }
  },

  getCurrGame: async () => {
    try {
      const response = await fetch('/api/game/curr', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error in getCurrGame:', error);
      throw error;
    }
  },

  makeGuess: async (letter) => {
    try {
      console.log("Testing console");
      const response = await fetch('/api/game/guess', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ letter }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error in makeGuess:', error);
      throw error;
    }
  },
};
