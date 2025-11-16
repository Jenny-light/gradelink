import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance for auth routes
export const authAPI = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// Create axios instance for general API calls
export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API endpoints
export const endpoints = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    me: '/auth/me',
    profile: '/auth/profile',
    changePassword: '/auth/change-password',
  },
  students: {
    list: '/students',
    detail: (id) => `/students/${id}`,
    grades: (id) => `/students/${id}/grades`,
  },
  teachers: {
    list: '/teachers',
    detail: (id) => `/teachers/${id}`,
    subjects: (id) => `/teachers/${id}/subjects`,
  },
  grades: {
    list: '/grades',
    detail: (id) => `/grades/${id}`,
    bulk: '/grades/bulk',
  },
  classes: {
    list: '/classes',
    detail: (id) => `/classes/${id}`,
    students: (id) => `/classes/${id}/students`,
    subjects: (id) => `/classes/${id}/subjects`,
  },
};

export default api;