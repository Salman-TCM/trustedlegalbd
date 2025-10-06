import api from './api';
import { API_ENDPOINTS } from '../config/api';

export const servicesService = {
  // Get all service categories
  getCategories: async () => {
    const response = await api.get(API_ENDPOINTS.CATEGORIES);
    return response.data;
  },

  // Get all services
  getServices: async (params = {}) => {
    const response = await api.get(API_ENDPOINTS.SERVICES, { params });
    return response.data;
  },

  // Get service by slug
  getServiceBySlug: async (slug) => {
    const response = await api.get(`${API_ENDPOINTS.SERVICES}${slug}/`);
    return response.data;
  },

  // Get featured services
  getFeaturedServices: async () => {
    const response = await api.get(API_ENDPOINTS.SERVICES_FEATURED);
    return response.data;
  },

  // Get services by category
  getServicesByCategory: async (categoryId) => {
    const response = await api.get(API_ENDPOINTS.SERVICES_BY_CATEGORY, {
      params: { category_id: categoryId }
    });
    return response.data;
  },

  // Create service inquiry
  createInquiry: async (inquiryData) => {
    const response = await api.post(API_ENDPOINTS.INQUIRIES, inquiryData);
    return response.data;
  },

  // Get user's inquiries
  getMyInquiries: async () => {
    const response = await api.get(API_ENDPOINTS.INQUIRIES);
    return response.data;
  },

  // Get testimonials
  getTestimonials: async (params = {}) => {
    const response = await api.get(API_ENDPOINTS.TESTIMONIALS, { params });
    return response.data;
  },

  // Get featured testimonials
  getFeaturedTestimonials: async () => {
    const response = await api.get(API_ENDPOINTS.TESTIMONIALS_FEATURED);
    return response.data;
  },
};