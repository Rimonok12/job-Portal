import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="nav">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          JobPortal
        </Link>

        <div className="nav-links">
          <Link to="/">Home</Link>

          {user ? (
            <>
              <span className="nav-user">
                Hi, {user.name} ({user.role})
              </span>

              {user.role === 'jobseeker' && (
                <Link to="/dashboard/jobseeker">Dashboard</Link>
              )}

              {user.role === 'employer' && (
                <Link to="/dashboard/employer">Dashboard</Link>
              )}

              {user.role === 'admin' && (
                <Link to="/dashboard/admin">Admin Panel</Link>
              )}

              <button className="btn-logout" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
