import axios from 'axios';

// Configure Axios Instance
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor to attach JWT token
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

// API Endpoints
export const authAPI = {
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },
  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  },
  updateProfile: async (profileData) => {
    const response = await api.put('/auth/profile', profileData);
    return response.data;
  },
  logout: () => {
    localStorage.removeItem('token');
  }
};

export const projectsAPI = {
  getAll: async () => {
    const response = await api.get('/projects');
    return response.data;
  },
  get: async (id) => {
    const response = await api.get(`/projects/${id}`);
    return response.data;
  },
  create: async (projectData) => {
    const response = await api.post('/projects', projectData);
    return response.data;
  },
  update: async (id, projectData) => {
    const response = await api.put(`/projects/${id}`, projectData);
    return response.data;
  },
  delete: async (id) => {
    const response = await api.delete(`/projects/${id}`);
    return response.data;
  },
  apply: async (id) => {
    const response = await api.post(`/projects/${id}/apply`);
    return response.data;
  },
  submit: async (id, submissionData) => {
    const response = await api.post(`/projects/${id}/submit`, submissionData);
    return response.data;
  },
  purchase: async (id) => {
    const response = await api.post(`/projects/${id}/purchase`);
    return response.data;
  }
};

export const coursesAPI = {
  getAll: async () => {
    const response = await api.get('/courses');
    return response.data;
  },
  enroll: async (id) => {
    const response = await api.post(`/courses/${id}/enroll`);
    return response.data;
  }
};

export const internshipsAPI = {
  getAll: async () => {
    const response = await api.get('/internships');
    return response.data;
  },
  create: async (internshipData) => {
    const response = await api.post('/internships', internshipData);
    return response.data;
  }
};

export const aiAPI = {
  getRecommendations: async () => {
    const response = await api.get('/ai/recommendations');
    return response.data;
  }
};

export default api;
