// import { useEffect, useState } from 'react';
// import { getAllEmployers, approveEmployer } from '../api/adminApi';
// import { useAuth } from '../hooks/useAuth';

// const AdminDashboard = () => {
//   useAuth(); // still runs the auth hook

//   const [employers, setEmployers] = useState([]);

//   // Fetch employers
//   const fetchEmployers = async () => {
//     const res = await getAllEmployers();
//     setEmployers(res.data);
//   };

//   useEffect(() => {
//     // REQUIRED FIX → wrap async call inside sync function
//     const load = () => {
//       fetchEmployers();
//     };

//     load();
//   }, []);

//   const handleApprove = async (id) => {
//     await approveEmployer(id);
//     fetchEmployers(); // refresh after approval
//   };

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>Admin Dashboard</h2>
//       <h3>Pending Employers</h3>

//       {employers.map((emp) => (
//         <div
//           key={emp._id}
//           style={{ border: '1px solid #ddd', padding: 15, marginBottom: 15 }}
//         >
//           <p>
//             <strong>Name:</strong> {emp.name}
//           </p>
//           <p>
//             <strong>Email:</strong> {emp.email}
//           </p>
//           <p>
//             <strong>Status:</strong> {emp.isApproved ? 'Approved' : 'Pending'}
//           </p>

//           {!emp.isApproved && (
//             <button
//               onClick={() => handleApprove(emp._id)}
//               style={{ padding: '5px 10px', marginTop: 10 }}
//             >
//               Approve Employer
//             </button>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default AdminDashboard;
// src/pages/AdminDashboard.jsx
import { useEffect, useState } from 'react';
import {
  getAllEmployers,
  approveEmployer,
  blockEmployer,
  unblockEmployer,
  getAllJobs,
  getAllApplications,
} from '../api/adminApi';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [employers, setEmployers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);

  // ---- Data loaders ----
  const loadEmployers = async () => {
    const res = await getAllEmployers();
    setEmployers(res.data);
  };

  const loadJobs = async () => {
    const res = await getAllJobs();
    setJobs(res.data);
  };

  const loadApplications = async () => {
    const res = await getAllApplications();
    setApplications(res.data);
  };

  // ---- Initial fetch ----
  useEffect(() => {
    const loadAll = async () => {
      await Promise.all([loadEmployers(), loadJobs(), loadApplications()]);
    };
    loadAll();
  }, []);

  const handleApprove = async (id) => {
    await approveEmployer(id);
    loadEmployers();
  };

  const handleBlock = async (id) => {
    await blockEmployer(id);
    loadEmployers();
  };

  const handleUnblock = async (id) => {
    await unblockEmployer(id);
    loadEmployers();
  };

  return (
    <div className="admin-page">
      <div className="admin-shell">
        <header className="admin-header">
          <h1 className="admin-title">Admin Dashboard</h1>
          <p className="admin-subtitle">
            Manage employers, jobs, and applications in one place.
          </p>
        </header>

        <div className="admin-grid">
          {/* ------------ Employers ------------ */}
          <section className="admin-card">
            <div className="admin-card-header">
              <h2>Employers</h2>
              <span className="pill">
                {employers.length}{' '}
                {employers.length === 1 ? 'employer' : 'employers'}
              </span>
            </div>

            {employers.length === 0 && (
              <p className="muted">No employers found yet.</p>
            )}

            <div className="admin-list">
              {employers.map((emp) => (
                <div key={emp._id} className="item-row">
                  <div className="item-main">
                    <div className="item-title">{emp.name}</div>
                    <div className="item-meta">{emp.email}</div>
                    <div className="item-tags">
                      <span
                        className={
                          emp.isApproved ? 'tag tag-success' : 'tag tag-warning'
                        }
                      >
                        {emp.isApproved ? 'Approved' : 'Pending'}
                      </span>
                      {emp.isBlocked && (
                        <span className="tag tag-danger">Blocked</span>
                      )}
                    </div>
                  </div>

                  <div className="item-actions">
                    {!emp.isApproved ? (
                      <button
                        className="btn btn-primary"
                        onClick={() => handleApprove(emp._id)}
                      >
                        Approve
                      </button>
                    ) : emp.isBlocked ? (
                      <button
                        className="btn btn-outline"
                        onClick={() => handleUnblock(emp._id)}
                      >
                        Unblock
                      </button>
                    ) : (
                      <button
                        className="btn btn-danger"
                        onClick={() => handleBlock(emp._id)}
                      >
                        Block
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ------------ Jobs ------------ */}
          <section className="admin-card">
            <div className="admin-card-header">
              <h2>Jobs</h2>
              <span className="pill">
                {jobs.length} {jobs.length === 1 ? 'job' : 'jobs'}
              </span>
            </div>

            {jobs.length === 0 && (
              <p className="muted">No jobs have been posted yet.</p>
            )}

            <div className="admin-list">
              {jobs.map((job) => (
                <div key={job._id} className="item-row">
                  <div className="item-main">
                    <div className="item-title">{job.title}</div>
                    <div className="item-meta">
                      {job.company} · {job.location} · {job.jobType}
                    </div>
                  </div>
                  <div className="item-side">
                    <span className="tag">{job.salaryRange}</span>
                    {job.employer?.name && (
                      <div className="item-meta-sm">by {job.employer.name}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ------------ Applications ------------ */}
          <section className="admin-card full-width">
            <div className="admin-card-header">
              <h2>Applications</h2>
              <span className="pill">
                {applications.length}{' '}
                {applications.length === 1 ? 'application' : 'applications'}
              </span>
            </div>

            {applications.length === 0 && (
              <p className="muted">No applications submitted yet.</p>
            )}

            <div className="admin-list">
              {applications.map((app) => (
                <div key={app._id} className="item-row">
                  <div className="item-main">
                    <div className="item-title">
                      {app.applicant?.name || 'Unknown'}{' '}
                      <span className="item-meta-sm">
                        → {app.job?.title || 'Unknown job'}
                      </span>
                    </div>
                    <div className="item-meta">{app.applicant?.email}</div>
                    {app.applicant?.skills && (
                      <div className="item-tags">
                        {app.applicant.skills.map((skill) => (
                          <span key={skill} className="tag tag-skill">
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
