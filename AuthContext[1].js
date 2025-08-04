import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // { name: '...', password: '...' }

  const login = (name, password) => {
    // For simplicity, hardcode a user. In a real app, this would be an API call.
    if (name === 'admin' && password === 'admin') {
      setUser({ name: 'admin', password: 'admin' });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const changePassword = (oldPassword, newPassword) => {
    if (user && user.password === oldPassword) {
      setUser({ ...user, password: newPassword });
      return true;
    }
    return false;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, changePassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);