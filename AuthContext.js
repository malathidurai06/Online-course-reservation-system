// ============================================================
// src/context/AuthContext.js - Global Authentication State
// Provides user info, login, logout, and register to all components
// ============================================================

import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../utils/api';

// Create the context object
const AuthContext = createContext(null);

// ── AuthProvider ──────────────────────────────────────────────
// Wrap the entire app with this to make auth state accessible everywhere
export const AuthProvider = ({ children }) => {
  // Initialize user from localStorage so state persists on page refresh
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Clear any auth error when navigating (called by pages on mount)
  const clearError = () => setError(null);

  // ── Register ────────────────────────────────────────────────
  const register = async (name, email, password) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.post('/auth/register', { name, email, password });
      // Save token and user info to localStorage for persistence
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);
      return { success: true };
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed';
      setError(msg);
      return { success: false, message: msg };
    } finally {
      setLoading(false);
    }
  };

  // ── Login ───────────────────────────────────────────────────
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);
      return { success: true };
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed';
      setError(msg);
      return { success: false, message: msg };
    } finally {
      setLoading(false);
    }
  };

  // ── Logout ──────────────────────────────────────────────────
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, register, logout, clearError }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easy consumption: const { user } = useAuth();
export const useAuth = () => useContext(AuthContext);
