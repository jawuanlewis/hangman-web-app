import { resetKeyboardState } from "@/util/keyboardState";

const API_URL = 'http://localhost:3000/api/game';

export const sessionService = {
  resetSession: async () => {
    try {
      const response = await fetch(`${API_URL}/reset`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      resetKeyboardState();

      return await response.json();
    } catch (error) {
      console.error('Error in resetSession:', error);
      throw error;
    }
  }
};
