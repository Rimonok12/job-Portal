// src/context/AuthProvider.jsx
import { createContext, useState } from 'react';
import { loginApi } from '../api/authApi';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });

  const [token, setToken] = useState(
    () => localStorage.getItem('token') || null
  );

  const login = async (email, password) => {
    try {
      const res = await loginApi({ email, password });
      const { token, user } = res.data;

      setUser(user);
      setToken(token);

      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
      return true;
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed.';
      throw new Error(msg);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
