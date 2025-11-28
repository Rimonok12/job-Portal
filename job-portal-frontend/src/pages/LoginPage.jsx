import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Navigate, useNavigate } from 'react-router-dom';
import './Auth.css';

const LoginPage = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 🔥 Auto-redirect if already logged in
  if (user) {
    if (user.role === 'admin')
      return <Navigate to="/dashboard/admin" replace />;
    if (user.role === 'employer')
      return <Navigate to="/dashboard/employer" replace />;
    if (user.role === 'jobseeker')
      return <Navigate to="/dashboard/jobseeker" replace />;
  }

  const submit = async (e) => {
    e.preventDefault();

    const success = await login(email, password);
    if (!success) return;

    // 🔥 Redirect after login
    const role = JSON.parse(localStorage.getItem('user')).role;

    if (role === 'admin') navigate('/dashboard/admin');
    else if (role === 'employer') navigate('/dashboard/employer');
    else navigate('/dashboard/jobseeker');
  };

  return (
    <div className="auth-page gradient-bg">
      <div className="auth-card card fade-in">
        <h2>Welcome Back</h2>
        <p className="muted">Login to continue</p>

        <form onSubmit={submit}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="btn btn-primary mt-3" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
