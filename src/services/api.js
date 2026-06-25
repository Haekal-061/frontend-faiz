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

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('campbread_token');
      localStorage.removeItem('campbread_role');
      localStorage.removeItem('campbread_user');
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default API;