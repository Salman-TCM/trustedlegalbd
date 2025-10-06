import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { servicesService } from '../services/servicesService';

// Query keys
export const SERVICE_QUERY_KEYS = {
  categories: ['categories'],
  services: ['services'],
  service: (slug) => ['service', slug],
  featuredServices: ['services', 'featured'],
  servicesByCategory: (categoryId) => ['services', 'category', categoryId],
  testimonials: ['testimonials'],
  featuredTestimonials: ['testimonials', 'featured'],
  inquiries: ['inquiries'],
};

// Categories hook
export const useCategories = () => {
  return useQuery({
    queryKey: SERVICE_QUERY_KEYS.categories,
    queryFn: servicesService.getCategories,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Services hook
export const useServices = (params = {}) => {
  return useQuery({
    queryKey: [...SERVICE_QUERY_KEYS.services, params],
    queryFn: () => servicesService.getServices(params),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

// Single service hook
export const useService = (slug) => {
  return useQuery({
    queryKey: SERVICE_QUERY_KEYS.service(slug),
    queryFn: () => servicesService.getServiceBySlug(slug),
    enabled: !!slug,
  });
};

// Featured services hook
export const useFeaturedServices = () => {
  return useQuery({
    queryKey: SERVICE_QUERY_KEYS.featuredServices,
    queryFn: servicesService.getFeaturedServices,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Services by category hook
export const useServicesByCategory = (categoryId) => {
  return useQuery({
    queryKey: SERVICE_QUERY_KEYS.servicesByCategory(categoryId),
    queryFn: () => servicesService.getServicesByCategory(categoryId),
    enabled: !!categoryId,
  });
};

// Testimonials hook
export const useTestimonials = (params = {}) => {
  return useQuery({
    queryKey: [...SERVICE_QUERY_KEYS.testimonials, params],
    queryFn: () => servicesService.getTestimonials(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Featured testimonials hook
export const useFeaturedTestimonials = () => {
  return useQuery({
    queryKey: SERVICE_QUERY_KEYS.featuredTestimonials,
    queryFn: servicesService.getFeaturedTestimonials,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Create inquiry mutation
export const useCreateInquiry = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: servicesService.createInquiry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SERVICE_QUERY_KEYS.inquiries });
    },
  });
};

// User inquiries hook
export const useMyInquiries = () => {
  return useQuery({
    queryKey: SERVICE_QUERY_KEYS.inquiries,
    queryFn: servicesService.getMyInquiries,
  });
};