import axios from 'axios';

const API = 'http://localhost:5050/api/auth';

// LOGIN
export const loginApi = (data) => {
  return axios.post(`${API}/login`, data);
};

// REGISTER
export const registerApi = (data) => {
  return axios.post(`${API}/register`, data);
};
