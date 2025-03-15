import axios from 'axios';
import { resetKeyboardState } from '@/utils/keyboardState';

// Create axios instance
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Global error handler
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('API Error:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
    });
    return Promise.reject(error);
  }
);

export const gameService = {
  initGame: async (level) => {
    try {
      resetKeyboardState();
      return await api.post('/game/init', { level });
    } catch (error) {
      console.error('Error in initGame:', error);
      throw error;
    }
  },

  getCurrGame: async () => {
    try {
      return await api.get('/game/curr');
    } catch (error) {
      console.error('Error in getCurrGame:', error);
      throw error;
    }
  },

  makeGuess: async (letter) => {
    try {
      return await api.post('/game/guess', { letter });
    } catch (error) {
      console.error('Error in makeGuess:', error);
      throw error;
    }
  },
};
