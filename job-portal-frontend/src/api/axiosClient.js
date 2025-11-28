import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://job-portal-1-d4oh.onrender.com/api', // backend base
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
