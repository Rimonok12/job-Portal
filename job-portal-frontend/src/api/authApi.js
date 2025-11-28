import axios from 'axios';

const API = `${import.meta.env.VITE_API_BASE_URL}/api/auth`;

// LOGIN
export const loginApi = (data) => {
  return axios.post(`${API}/login`, data);
};

// REGISTER
export const registerApi = (data) => {
  return axios.post(`${API}/register`, data);
};
