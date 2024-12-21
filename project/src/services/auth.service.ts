import api from './api';
import { AuthResponse } from '../types/auth';
import { setToken, removeToken } from '../utils/token';

export const authService = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', { email, password });
    if (response.data.token) {
      setToken(response.data.token);
    }
    return response.data;
  },

  signup: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/signup', { email, password });
    if (response.data.token) {
      setToken(response.data.token);
    }
    return response.data;
  },

  logout: (): void => {
    removeToken();
  },
};