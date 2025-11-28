import { useEffect, useState } from 'react';
import { getAllJobs, applyToJob } from '../api/jobsApi';
import { useAuth } from '../hooks/useAuth';

const HomePage = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  //   const [filtered, setFiltered] = useState([]);
  const [filters, setFilters] = useState({
    location: '',
    jobType: '',
  });
  const [message, setMessage] = useState('');

  // Fetch jobs on load
  useEffect(() => {
    const fetchJobs = async () => {
      const res = await getAllJobs();
      setJobs(res.data);
      //   setFiltered(res.data);
    };
    fetchJobs();
  }, []);

  // Filter logic
  const filtered = jobs.filter((job) => {
    const matchesLocation =
      filters.location === '' ||
      job.location.toLowerCase().includes(filters.location.toLowerCase());

    const matchesType =
      filters.jobType === '' || job.jobType === filters.jobType;

    return matchesLocation && matchesType;
  });

  const handleApply = async (jobId) => {
    try {
      setMessage('');

      if (!user) {
        setMessage('Please login to apply.');
        return;
      }

      if (user.role !== 'jobseeker') {
        setMessage('Only jobseekers can apply.');
        return;
      }

      await applyToJob(jobId);
      setMessage('Application submitted!');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to apply.');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Available Jobs</h2>

      {message && <p style={{ color: 'green' }}>{message}</p>}

      {/* Filters */}
      <div style={{ display: 'flex', gap: 20, marginBottom: 20 }}>
        <input
          placeholder="Filter by location"
          value={filters.location}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, location: e.target.value }))
          }
        />

        <select
          value={filters.jobType}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, jobType: e.target.value }))
          }
        >
          <option value="">All Types</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Remote">Remote</option>
        </select>
      </div>

      {/* Jobs List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {filtered.map((job) => (
          <div
            key={job._id}
            style={{
              border: '1px solid #ddd',
              padding: 16,
              borderRadius: 6,
            }}
          >
            <h3>{job.title}</h3>
            <p>
              <strong>Company:</strong> {job.company}
            </p>
            <p>
              <strong>Location:</strong> {job.location}
            </p>
            <p>
              <strong>Type:</strong> {job.jobType}
            </p>
            <p>
              <strong>Salary:</strong> {job.salaryRange}
            </p>

            {user?.role === 'jobseeker' && (
              <button
                onClick={() => handleApply(job._id)}
                style={{
                  marginTop: 10,
                  padding: '6px 12px',
                  cursor: 'pointer',
                }}
              >
                Apply
              </button>
            )}

            {!user && (
              <button
                onClick={() => setMessage('Login to apply.')}
                style={{
                  marginTop: 10,
                  padding: '6px 12px',
                  cursor: 'pointer',
                }}
              >
                Login to Apply
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
