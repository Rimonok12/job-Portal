import axios from 'axios';

const API = 'https://job-portal-1-d4oh.onrender.com/api/auth';

// LOGIN
export const loginApi = (data) => {
  return axios.post(`${API}/login`, data);
};

// REGISTER
export const registerApi = (data) => {
  return axios.post(`${API}/register`, data);
};
