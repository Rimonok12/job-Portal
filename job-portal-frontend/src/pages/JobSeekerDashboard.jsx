import { useEffect, useState } from 'react';
import api from '../api/requests';
import './Dashboard.css';

const JobSeekerDashboard = () => {
  const [profile, setProfile] = useState({
    bio: '',
    skills: '',
    resume: '',
  });

  const [jobs, setJobs] = useState([]);
  const [applied, setApplied] = useState([]);
  const [filters, setFilters] = useState({
    location: '',
    jobType: '',
  });

  // ✅ 1. Functions MUST be defined BEFORE useEffect

  const loadJobs = async () => {
    const res = await api.get('/api/jobs/all', {
      params: {
        location: filters.location,
        jobType: filters.jobType,
      },
    });
    setJobs(res.data);
  };

  const loadApplied = async () => {
    const res = await api.get('/api/applications/my-applications');
    setApplied(res.data);
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    await api.put('/api/users/profile', profile);
    alert('Profile updated!');
  };

  const applyJob = async (jobId) => {
    try {
      await api.post(`/api/applications/apply/${jobId}`);
      alert('Applied!');
      loadApplied();
    } catch (err) {
      alert(err.response?.data?.message || "Can't apply");
    }
  };

  const isApplied = (jobId) => applied.some((a) => a.job?._id === jobId);

  // ✅ 2. useEffect AFTER functions (ESLint approved)
  useEffect(() => {
    const fetchData = async () => {
      await loadJobs();
      await loadApplied();
    };

    fetchData();
  }, []);

  // ---------------------------------------------
  // UI
  // ---------------------------------------------
  return (
    <div className="dashboard-container">
      {/* LEFT: PROFILE */}
      <div className="profile-card card fade-in">
        <h2>My Profile</h2>

        <form onSubmit={updateProfile}>
          {/* <label>Bio</label>
          <textarea
            value={profile.bio}
            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
          /> */}

          <label>Skills (comma separated)</label>
          <input
            value={profile.skills}
            onChange={(e) => setProfile({ ...profile, skills: e.target.value })}
          />

          <label>Resume URL (optional)</label>
          <input
            value={profile.resume}
            onChange={(e) => setProfile({ ...profile, resume: e.target.value })}
          />

          <button className="btn btn-primary mt-2">Save Profile</button>
        </form>
      </div>

      {/* RIGHT: JOB LIST */}
      <div className="jobs-card card fade-in">
        <h2>Browse Jobs</h2>

        {/* Filters */}
        <div className="filters">
          <select
            value={filters.location}
            onChange={(e) => {
              setFilters({ ...filters, location: e.target.value });
              loadJobs();
            }}
          >
            <option value="">Location</option>
            <option value="Dhaka">Dhaka</option>
            <option value="Chattogram">Chattogram</option>
          </select>

          <select
            value={filters.jobType}
            onChange={(e) => {
              setFilters({ ...filters, jobType: e.target.value });
              loadJobs();
            }}
          >
            <option value="">Job Type</option>
            <option value="Full-time">Full-time</option>
            <option value="Remote">Remote</option>
            <option value="Part-time">Part-time</option>
          </select>
        </div>

        {/* Job list */}
        {jobs.length === 0 ? (
          <p>No jobs found.</p>
        ) : (
          jobs.map((job) => (
            <div key={job._id} className="job-item">
              <h3>{job.title}</h3>
              <p>
                {job.company} – {job.location}
              </p>
              <span className="tag">{job.jobType}</span>

              <button
                className="btn btn-primary mt-2"
                disabled={isApplied(job._id)}
                onClick={() => applyJob(job._id)}
              >
                {isApplied(job._id) ? 'Applied' : 'Apply Now'}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default JobSeekerDashboard;
