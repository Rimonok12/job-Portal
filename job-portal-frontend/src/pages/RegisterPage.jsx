// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { registerApi } from '../api/authApi';

// const RegisterPage = () => {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     name: '',
//     email: '',
//     password: '',
//     role: 'jobseeker',
//   });
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   const handleChange = (e) => {
//     setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');

//     try {
//       await registerApi(form);
//       setSuccess('Registered successfully. You can now login.');
//       setTimeout(() => navigate('/login'), 1000);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Registration failed');
//     }
//   };

//   return (
//     <div style={{ maxWidth: 400, margin: '40px auto' }}>
//       <h2>Register</h2>

//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       {success && <p style={{ color: 'green' }}>{success}</p>}

//       <form onSubmit={handleSubmit}>
//         <div style={{ marginBottom: 12 }}>
//           <label>Name</label>
//           <input
//             name="name"
//             value={form.name}
//             onChange={handleChange}
//             style={{ width: '100%' }}
//           />
//         </div>

//         <div style={{ marginBottom: 12 }}>
//           <label>Email</label>
//           <input
//             name="email"
//             type="email"
//             value={form.email}
//             onChange={handleChange}
//             style={{ width: '100%' }}
//           />
//         </div>

//         <div style={{ marginBottom: 12 }}>
//           <label>Password</label>
//           <input
//             name="password"
//             type="password"
//             value={form.password}
//             onChange={handleChange}
//             style={{ width: '100%' }}
//           />
//         </div>

//         <div style={{ marginBottom: 12 }}>
//           <label>Role</label>
//           <select
//             name="role"
//             value={form.role}
//             onChange={handleChange}
//             style={{ width: '100%' }}
//           >
//             <option value="jobseeker">Job Seeker</option>
//             <option value="employer">Employer</option>
//           </select>
//         </div>

//         <button type="submit">Register</button>
//       </form>
//     </div>
//   );
// };

// export default RegisterPage;

import { useState } from 'react';
import { registerApi } from '../api/authApi';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('jobseeker');
  const [message, setMessage] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      await registerApi({ name, email, password, role });
      setMessage('Account created successfully! Redirecting...');

      setTimeout(() => navigate('/login'), 1200);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <div className="auth-page gradient-bg">
      <div className="auth-card card">
        <h2>Create an Account</h2>
        <p className="muted">Sign up to get started</p>

        {message && <div className="alert-box">{message}</div>}

        <form onSubmit={submit}>
          <label>Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label>Account Type</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="select-input"
          >
            <option value="jobseeker">Job Seeker</option>
            <option value="employer">Employer</option>
          </select>

          <button className="btn btn-primary mt-3" type="submit">
            Register
          </button>
        </form>

        <p className="text-center mt-2">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
