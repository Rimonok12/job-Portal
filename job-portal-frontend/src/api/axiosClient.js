import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:5050/api', // backend base
});

// Add token to every request if exists
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosClient;
