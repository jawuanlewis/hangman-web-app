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

export const sessionService = {
  resetSession: async () => {
    try {
      resetKeyboardState();
      return await api.post('/game/reset');
    } catch (error) {
      console.error('Error in resetSession:', error);
      throw error;
    }
  },
};
