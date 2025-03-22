import api from './apiClient';
import { resetKeyboardState } from '@/utils/keyboardState';

export const gameService = {
  initGame: async (level) => {
    resetKeyboardState();
    return await api.post('/game/init', { level });
  },

  getCurrGame: async () => {
    return await api.get('/game/curr');
  },

  makeGuess: async (letter) => {
    return await api.post('/game/guess', { letter });
  },
};
