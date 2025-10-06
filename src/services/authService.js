import api, { setTokens, clearTokens } from './api';
import { API_ENDPOINTS } from '../config/api';

export const authService = {
  // Login user
  login: async (credentials) => {
    const response = await api.post(API_ENDPOINTS.LOGIN, credentials);
    const { access, refresh } = response.data;
    setTokens(access, refresh);
    return response.data;
  },

  // Register user
  register: async (userData) => {
    const response = await api.post(API_ENDPOINTS.REGISTER, userData);
    return response.data;
  },

  // Logout user
  logout: async () => {
    try {
      await api.post(API_ENDPOINTS.LOGOUT);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      clearTokens();
    }
  },

  // Get user profile
  getProfile: async () => {
    const response = await api.get(API_ENDPOINTS.PROFILE);
    return response.data;
  },

  // Update user profile
  updateProfile: async (userData) => {
    const response = await api.patch(API_ENDPOINTS.PROFILE, userData);
    return response.data;
  },

  // Change password
  changePassword: async (passwordData) => {
    const response = await api.put('/auth/change-password/', passwordData);
    return response.data;
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('access_token');
  },
};