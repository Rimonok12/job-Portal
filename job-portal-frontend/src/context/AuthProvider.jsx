// import { useState } from 'react';
// import AuthContext from './AuthContext';
// import { loginApi } from '../api/authApi';

// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(() => {
//     const saved = localStorage.getItem('user');
//     return saved ? JSON.parse(saved) : null;
//   });

//   const [token, setToken] = useState(
//     () => localStorage.getItem('token') || null
//   );

//   //   const login = async (email, password) => {
//   //     const res = await loginApi({ email, password });
//   //     const { token, user } = res.data;

//   //     setUser(user);
//   //     setToken(token);

//   //     localStorage.setItem('user', JSON.stringify(user));
//   //     localStorage.setItem('token', token);
//   //   };
//   const login = async (email, password) => {
//     const res = await loginApi({ email, password });
//     const { token, user } = res.data;

//     // Make sure user.isApproved exists
//     const safeUser = { ...user, isApproved: user.isApproved ?? false };

//     setUser(safeUser);
//     setToken(token);

//     localStorage.setItem('user', JSON.stringify(safeUser));
//     localStorage.setItem('token', token);

//     return true;
//   };

//   const logout = () => {
//     setUser(null);
//     setToken(null);
//     localStorage.removeItem('user');
//     localStorage.removeItem('token');
//   };

//   return (
//     <AuthContext.Provider value={{ user, token, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthProvider;

import { useState } from 'react';
import AuthContext from './AuthContext';
import { loginApi } from '../api/authApi';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  const [token, setToken] = useState(() => localStorage.getItem('token'));

  const login = async (email, password) => {
    const res = await loginApi({ email, password });
    const { token, user } = res.data;

    const safeUser = { ...user, isApproved: user.isApproved ?? false };

    setUser(safeUser);
    setToken(token);

    localStorage.setItem('user', JSON.stringify(safeUser));
    localStorage.setItem('token', token);

    return true;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
