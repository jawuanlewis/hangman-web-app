import { resetKeyboardState } from '@/utils/keyboardState';

export const sessionService = {
  resetSession: async () => {
    try {
      const response = await fetch('/api/game/reset', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Reset session response error:', {
          status: response.status,
          statusText: response.statusText,
          body: errorText,
        });
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      resetKeyboardState();

      return await response.json();
    } catch (error) {
      console.error('Error in resetSession:', error);
      throw error;
    }
  },
};
