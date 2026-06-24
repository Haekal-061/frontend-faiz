import axios from 'axios';

const API = axios.create({
  baseURL:
    process.env.REACT_APP_API_BASE_URL ||
    'https://backend-campbread-production.up.railway.app/api'
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('campbread_token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
