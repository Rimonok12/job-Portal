// import { useContext } from 'react';
// import { AuthContext } from '../context/AuthProvider';

// export const useAuth = () => {
//   const ctx = useContext(AuthContext);

//   // Prevent Navbar crash
//   if (!ctx) {
//     return { user: null, token: null, login: () => {}, logout: () => {} };
//   }

//   return ctx;
// };
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

export const useAuth = () => {
  return useContext(AuthContext);
};
