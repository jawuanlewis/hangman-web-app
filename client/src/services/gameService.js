const API_URL = 'http://localhost:3000/api/game';

export const gameService = {
  initGame: async (level) => {
    try {
      const response = await fetch(`${API_URL}/init`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ level })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error in initGame:', error);
      throw error;
    }
  },

  makeGuess: async (letter) => {
    try {
      const response = await fetch(`${API_URL}/guess`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ letter })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error in makeGuess:', error);
      throw error;
    }
  }
};
