// Get base URL from environment variable
const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

// Ensure URL doesn't have trailing slash and add /api
export const API_BASE_URL = `${BASE_URL.replace(/\/$/, '')}/api`;

export const API_ENDPOINTS = {
  // Authentication
  LOGIN: '/auth/login/',
  REGISTER: '/auth/register/',
  REFRESH: '/auth/refresh/',
  PROFILE: '/auth/profile/',
  LOGOUT: '/auth/logout/',
  
  // Services
  CATEGORIES: '/categories/',
  SERVICES: '/services/',
  SERVICES_FEATURED: '/services/featured/',
  SERVICES_BY_CATEGORY: '/services/by_category/',
  
  // Inquiries
  INQUIRIES: '/inquiries/',
  
  // Testimonials
  TESTIMONIALS: '/testimonials/',
  TESTIMONIALS_FEATURED: '/testimonials/featured/',
};