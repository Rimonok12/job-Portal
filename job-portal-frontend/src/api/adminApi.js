// import api from './requests';

// const API = '/api/admin';

// export const getAllEmployers = () => {
//   return api.get(`${API}/employers`);
// };

// export const approveEmployer = (id) => {
//   return api.put(`${API}/approve/${id}`);
// };
import api from './requests';

const API = '/api/admin';

export const getPendingEmployers = () => api.get(`${API}/pending-employers`);
export const getAllEmployers = () => api.get(`${API}/employers`);
export const approveEmployer = (id) => api.put(`${API}/approve/${id}`);
export const blockEmployer = (id) => api.put(`${API}/block/${id}`);
export const unblockEmployer = (id) => api.put(`${API}/unblock/${id}`);

export const getAllJobs = () => api.get(`${API}/jobs`);
export const getAllApplications = () => api.get(`${API}/applications`);
