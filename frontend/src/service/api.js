import axios from 'axios';

const API_URL = 'http://localhost:1234/api';

// Create an axios instance with the base URL and credentials
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// create and export the api class instance
export const apiService = {
  // Categories
  getCategories: () => api.get('/categories'),
  getCategoryById: (id) => api.get(`/categories/${id}`),
  getCategoryWithAllNotes: (id) => api.get(`/categories/${id}/notes`),
  createCategory: (data) => api.post('/categories', data),
  updateCategory: (id, data) => api.put(`/categories/${id}`, data),
  deleteCategory: (id) => api.delete(`/categories/${id}`),

  // Posts
  getPosts: () => api.get('/posts'),
  getPostById: (id) => api.get(`/posts/${id}`),
  createPost: (data) => api.post('/posts', data),
  updatePost: (id, data) => api.put(`/posts/${id}`, data),
  deletePost: (id) => api.delete(`/posts/${id}`),
};