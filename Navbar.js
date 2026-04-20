// ============================================================
// src/components/Navbar.js - Top Navigation Bar
// Shows links that change based on login state
// ============================================================

import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-inner container">
        {/* Brand / Logo */}
        <Link to="/" className="navbar-brand">
          <span className="brand-icon">🎓</span>
          <span className="brand-text">LearnHub</span>
        </Link>

        {/* Desktop Links */}
        <div className="navbar-links">
          <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
            Courses
          </Link>

          {user ? (
            <>
              <Link
                to="/my-courses"
                className={`nav-link ${isActive('/my-courses') ? 'active' : ''}`}
              >
                My Courses
              </Link>
              <div className="nav-user">
                <span className="nav-avatar">{user.name.charAt(0).toUpperCase()}</span>
                <span className="nav-username">{user.name.split(' ')[0]}</span>
              </div>
              <button className="btn btn-secondary btn-sm" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-secondary btn-sm">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm">
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu">
          <Link to="/" onClick={() => setMenuOpen(false)} className="mobile-link">Courses</Link>
          {user ? (
            <>
              <Link to="/my-courses" onClick={() => setMenuOpen(false)} className="mobile-link">My Courses</Link>
              <button onClick={handleLogout} className="mobile-link mobile-logout">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)} className="mobile-link">Login</Link>
              <Link to="/register" onClick={() => setMenuOpen(false)} className="mobile-link">Sign Up</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
