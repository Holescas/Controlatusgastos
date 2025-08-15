import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // { name: '...', password: '...' }
  const [users, setUsers] = useState(() => {
    // Load users from localStorage on initial load
    const storedUsers = localStorage.getItem('app_users');
    return storedUsers ? JSON.parse(storedUsers) : [{ name: 'admin', password: 'admin' }];
  });

  // Save users to localStorage whenever the users state changes
  useEffect(() => {
    localStorage.setItem('app_users', JSON.stringify(users));
  }, [users]);

  // Attempt to auto-login if a user was previously logged in (simple persistence)
  useEffect(() => {
    const lastLoggedInUser = localStorage.getItem('last_logged_in_user');
    if (lastLoggedInUser) {
      const foundUser = users.find(u => u.name === lastLoggedInUser);
      if (foundUser) {
        setUser(foundUser);
      }
    }
  }, [users]);

  const login = (name, password) => {
    const foundUser = users.find(u => u.name === name && u.password === password);
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('last_logged_in_user', name); // Remember last logged in user
      return true;
    }
    return false;
  };

  const register = (name, password) => {
    if (users.some(u => u.name === name)) {
      return false; // User already exists
    }
    const newUser = { name, password };
    setUsers([...users, newUser]);
    setUser(newUser); // Log in the new user immediately
    localStorage.setItem('last_logged_in_user', name);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('last_logged_in_user'); // Clear last logged in user
  };

  const changePassword = (oldPassword, newPassword) => {
    if (user && user.password === oldPassword) {
      const updatedUsers = users.map(u =>
        u.name === user.name ? { ...u, password: newPassword } : u
      );
      setUsers(updatedUsers);
      setUser({ ...user, password: newPassword }); // Update current user's password
      return true;
    }
    return false;
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, changePassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);