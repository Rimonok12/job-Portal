// import { useState, useEffect } from 'react';
// // import api from '../api/api';
// import api from '../api/requests';

// import { useAuth } from '../hooks/useAuth';
// import './Edashboard.css';

// const EmployerDashboard = () => {
//   const { user } = useAuth();
//   const [jobs, setJobs] = useState([]);
//   const [applicants, setApplicants] = useState([]);
//   const [selectedJob, setSelectedJob] = useState(null);
//   const [showSuccess, setShowSuccess] = useState(false);

//   const [form, setForm] = useState({
//     title: '',
//     company: '',
//     location: '',
//     jobType: 'Full-time',
//     salaryRange: '',
//     description: '',
//   });

//   // Load employer jobs
//   const loadJobs = async () => {
//     const res = await api.get('/api/jobs/all');
//     const myJobs = res.data.filter((job) => job.employer === user._id);
//     setJobs(myJobs);
//   };

//   // Load applicants for a job
//   const loadApplicants = async (jobId) => {
//     const res = await api.get(`/api/applications/${jobId}/applicants`);
//     setApplicants(res.data);
//     setSelectedJob(jobId);
//   };

//   // Create job
//   const createJob = async (e) => {
//     e.preventDefault();
//     await api.post('/api/jobs/create', form);
//     await loadJobs();
//     setForm({
//       title: '',
//       company: '',
//       location: '',
//       jobType: 'Full-time',
//       salaryRange: '',
//       description: '',
//     });
//     setShowSuccess(true);
//     setTimeout(() => setShowSuccess(false), 2000);
//   };

//   // Delete job
//   const deleteJob = async (id) => {
//     await api.delete(`/api/jobs/delete/${id}`);
//     loadJobs();
//   };

//   // First load
//   useEffect(() => {
//     const fetchData = async () => {
//       await loadJobs();
//     };

//     fetchData();
//   }, []);

//   // 🔒 If employer is not approved
//   //   if (user?.isApproved) {
//   if (user.role === 'employer' && user.isApproved === true) {
//     return (
//       <div className="pending-box">
//         <h2>Your account is pending approval</h2>
//         <p>Admin must approve your account before you can post jobs.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="dashboard-page">
//       <h2>Employer Dashboard</h2>

//       {/* Job Form */}
//       <div className="card mt-3">
//         <h3>Create Job Post</h3>

//         <form onSubmit={createJob} className="job-form">
//           <input
//             type="text"
//             placeholder="Job Title"
//             value={form.title}
//             onChange={(e) => setForm({ ...form, title: e.target.value })}
//             required
//           />

//           <input
//             type="text"
//             placeholder="Company"
//             value={form.company}
//             onChange={(e) => setForm({ ...form, company: e.target.value })}
//             required
//           />

//           <input
//             type="text"
//             placeholder="Location"
//             value={form.location}
//             onChange={(e) => setForm({ ...form, location: e.target.value })}
//             required
//           />

//           <select
//             value={form.jobType}
//             onChange={(e) => setForm({ ...form, jobType: e.target.value })}
//           >
//             <option>Full-time</option>
//             <option>Part-time</option>
//             <option>Remote</option>
//           </select>

//           <input
//             type="text"
//             placeholder="Salary Range"
//             value={form.salaryRange}
//             onChange={(e) => setForm({ ...form, salaryRange: e.target.value })}
//           />

//           <textarea
//             placeholder="Job Description"
//             value={form.description}
//             onChange={(e) => setForm({ ...form, description: e.target.value })}
//             required
//           />

//           <button className="btn btn-primary mt-2">Create Job</button>
//         </form>
//       </div>

//       {/* Job List */}
//       <h3 className="mt-4">Your Job Posts</h3>
//       <div className="list-box">
//         {jobs.map((job) => (
//           <div key={job._id} className="card job-card">
//             <h4>{job.title}</h4>
//             <p>
//               <strong>Company:</strong> {job.company}
//             </p>
//             <p>
//               <strong>Location:</strong> {job.location}
//             </p>

//             <button
//               className="btn btn-secondary"
//               onClick={() => loadApplicants(job._id)}
//             >
//               View Applicants
//             </button>

//             <button
//               className="btn btn-danger ml-2"
//               onClick={() => deleteJob(job._id)}
//             >
//               Delete
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* Applicants List */}
//       {selectedJob && (
//         <div className="card mt-4">
//           <h3>Applicants</h3>

//           {applicants.length === 0 && <p>No applicants yet.</p>}

//           {applicants.map((app) => (
//             <div key={app._id} className="applicant-box">
//               <p>
//                 <strong>Name: </strong>
//                 {app.applicant.name}
//               </p>
//               <p>
//                 <strong>Email: </strong>
//                 {app.applicant.email}
//               </p>
//               <p>
//                 <strong>Skills: </strong>
//                 {app.applicant.skills?.join(', ')}
//               </p>

//               {app.applicant.resumeUrl && (
//                 <a
//                   href={app.applicant.resumeUrl}
//                   target="_blank"
//                   rel="noreferrer"
//                   className="btn btn-link"
//                 >
//                   View Resume
//                 </a>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default EmployerDashboard;
import { useState, useEffect } from 'react';
import api from '../api/requests';
import { useAuth } from '../hooks/useAuth';
import './Edashboard.css';

const EmployerDashboard = () => {
  const { user } = useAuth();

  const [jobs, setJobs] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const [form, setForm] = useState({
    title: '',
    company: '',
    location: '',
    jobType: 'Full-time',
    salaryRange: '',
    description: '',
  });

  // -----------------------------------------
  // Load Employer Jobs
  // -----------------------------------------
  const loadJobs = async () => {
    const res = await api.get('/api/jobs/all');

    // FIX: employer is object → compare _id
    const myJobs = res.data.filter((job) => job.employer?._id === user._id);

    setJobs(myJobs);
  };

  // -----------------------------------------
  // Load Applicants for a Job
  // -----------------------------------------
  const loadApplicants = async (jobId) => {
    const res = await api.get(`/api/applications/${jobId}/applicants`);
    setApplicants(res.data);
    setSelectedJob(jobId);
  };

  // -----------------------------------------
  // Create Job
  // -----------------------------------------
  const createJob = async (e) => {
    e.preventDefault();

    await api.post('/api/jobs/create', form);
    await loadJobs();

    setForm({
      title: '',
      company: '',
      location: '',
      jobType: 'Full-time',
      salaryRange: '',
      description: '',
    });

    // 🎉 Show popup
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  // -----------------------------------------
  // Delete Job
  // -----------------------------------------
  const deleteJob = async (id) => {
    await api.delete(`/api/jobs/delete/${id}`);
    loadJobs();
  };

  // -----------------------------------------
  // First Load
  // -----------------------------------------
  useEffect(() => {
    const fetchData = async () => {
      await loadJobs();
    };

    fetchData();
  }, []);

  // -----------------------------------------
  // Pending Approval Screen
  // -----------------------------------------
  if (user.role === 'employer' && user.isApproved === true) {
    return (
      <div className="pending-box">
        <h2>Your account is pending approval</h2>
        <p>Admin must approve your account before you can post jobs.</p>
      </div>
    );
  }

  // -----------------------------------------
  // MAIN DASHBOARD
  // -----------------------------------------
  return (
    <div className="dashboard-page">
      {/* 🎉 SUCCESS POPUP */}
      {showSuccess && (
        <div className="popup-overlay">
          <div className="popup-card">
            <h3>🎉 Job Posted Successfully!</h3>
            <p>Your job listing has been created.</p>
          </div>
        </div>
      )}

      <h2>Employer Dashboard</h2>

      {/* Create Job Form */}
      <div className="card mt-3">
        <h3>Create Job Post</h3>

        <form onSubmit={createJob} className="job-form">
          <input
            type="text"
            placeholder="Job Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />

          <input
            type="text"
            placeholder="Company"
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            required
          />

          <input
            type="text"
            placeholder="Location"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            required
          />

          <select
            value={form.jobType}
            onChange={(e) => setForm({ ...form, jobType: e.target.value })}
          >
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Remote</option>
          </select>

          <input
            type="text"
            placeholder="Salary Range"
            value={form.salaryRange}
            onChange={(e) => setForm({ ...form, salaryRange: e.target.value })}
          />

          <textarea
            placeholder="Job Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
          />

          <button className="btn btn-primary mt-2">Create Job</button>
        </form>
      </div>

      {/* Job List */}
      <h3 className="mt-4">Your Job Posts</h3>
      <div className="list-box">
        {jobs.map((job) => (
          <div key={job._id} className="card job-card">
            <h4>{job.title}</h4>
            <p>
              <strong>Company:</strong> {job.company}
            </p>
            <p>
              <strong>Location:</strong> {job.location}
            </p>

            <button
              className="btn btn-secondary"
              onClick={() => loadApplicants(job._id)}
            >
              View Applicants
            </button>

            <button
              className="btn btn-danger ml-2"
              onClick={() => deleteJob(job._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Applicants List */}
      {selectedJob && (
        <div className="card mt-4">
          <h3>Applicants</h3>

          {applicants.length === 0 && <p>No applicants yet.</p>}

          {applicants.map((app) => (
            <div key={app._id} className="applicant-box">
              <p>
                <strong>Name: </strong>
                {app.applicant.name}
              </p>
              <p>
                <strong>Email: </strong>
                {app.applicant.email}
              </p>
              <p>
                <strong>Skills: </strong>
                {app.applicant.skills?.join(', ')}
              </p>

              {app.applicant.resumeUrl && (
                <a
                  href={app.applicant.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-link"
                >
                  View Resume
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmployerDashboard;
