import { resetKeyboardState } from '@/utils/keyboardState';

const API_URL = 'https://hangman-testing-38f61c8ec34a.herokuapp.com/api/game';

export const gameService = {
  initGame: async (level) => {
    try {
      const response = await fetch(`${API_URL}/init`, {
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
      const response = await fetch(`${API_URL}/curr`, {
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
      const response = await fetch(`${API_URL}/guess`, {
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
