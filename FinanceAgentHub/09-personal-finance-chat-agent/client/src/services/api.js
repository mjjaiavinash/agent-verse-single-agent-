import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5008/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

export default api;
