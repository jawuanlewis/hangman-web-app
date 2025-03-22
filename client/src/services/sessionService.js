import api from './apiClient';
import { resetKeyboardState } from '@/utils/keyboardState';

export const sessionService = {
  resetSession: async () => {
    resetKeyboardState();
    return await api.post('/game/reset');
  },
};
