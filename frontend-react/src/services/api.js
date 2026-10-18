import axios from 'axios';

// ============================================
// API CONFIGURATION
// ============================================

const API_URL = 'http://localhost:3000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// ============================================
// REQUEST INTERCEPTOR
// Adds JWT token to every request automatically
// ============================================

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// ============================================
// RESPONSE INTERCEPTOR
// Handles 401 errors (token expired)
// ============================================

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            if (window.location.pathname !== '/login') {
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

// ============================================
// AUTH APIs
// ============================================

export const authAPI = {
    register: (data) => api.post('/auth/register', data),
    login: (data) => api.post('/auth/login', data),
    getProfile: () => api.get('/auth/profile'),
};

// ============================================
// RECIPE APIs
// ============================================

export const recipeAPI = {
    getAll: () => api.get('/recipes'),
    getOne: (id) => api.get(`/recipes/${id}`),
    create: (data) => api.post('/recipes', data),
    update: (id, data) => api.put(`/recipes/${id}`, data),
    delete: (id) => api.delete(`/recipes/${id}`),
    search: (query) => api.get(`/recipes/search?q=${encodeURIComponent(query)}`),
};

// ============================================
// FAVORITE APIs
// ============================================

export const favoriteAPI = {
    getAll: () => api.get('/favorites'),
    add: (recipeId) => api.post('/favorites', { recipe_id: recipeId }),
    remove: (recipeId) => api.delete(`/favorites/${recipeId}`),
};

export default api;