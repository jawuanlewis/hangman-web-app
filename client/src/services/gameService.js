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
        const errorText = await response.text();
        console.error('Initialize game response error:', {
          status: response.status,
          statusText: response.statusText,
          body: errorText,
        });
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
        const errorText = await response.text();
        console.error('Current game response error:', {
          status: response.status,
          statusText: response.statusText,
          body: errorText,
        });
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
      const response = await fetch('/api/game/guess', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ letter }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Guess response error:', {
          status: response.status,
          statusText: response.statusText,
          body: errorText,
        });
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error in makeGuess:', error);
      throw error;
    }
  },
};
