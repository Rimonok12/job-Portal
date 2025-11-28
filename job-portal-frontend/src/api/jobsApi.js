import axiosClient from './axiosClient';

export const getAllJobs = () => axiosClient.get('/jobs/all');

export const applyToJob = (jobId) =>
  axiosClient.post(`/applications/apply/${jobId}`);
