import React, { useState, useEffect } from 'react'
import './Navbar.css'
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Check if we are on Login or Register page
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    // Listen for the custom event from Login.js
    const handleAuthChange = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };

    window.addEventListener("authChange", handleAuthChange);
    return () => window.removeEventListener("authChange", handleAuthChange);
  }, [location]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    localStorage.clear(); // Clears token, role, and email
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* Logo - ALWAYS VISIBLE */}
        <div className="navbar-logo">
          <span className="logo-text" onClick={() => navigate("/")}>
            <span className="logo-first-letter">R</span>entX
          </span>
        </div>

        {/* SHOWN ONLY IF:
            1. NOT on an Auth Page (Login/Register)
            2. User IS Logged In
        */}
        {!isAuthPage && isLoggedIn && (
          <>
            {/* Hamburger */}
            <div className={`hamburger ${isOpen ? 'active' : ''}`} onClick={toggleMenu}>
              <span></span><span></span><span></span>
            </div>

            {/* Links */}
            <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
              <li className="nav-item"><a href="/" className="nav-link">Home</a></li>
              <li className="nav-item"><a href="/vehicles" className="nav-link">Browse Vehicles</a></li>
              <li className="nav-item"><a href="/about" className="nav-link">About Us</a></li>
              <li className="nav-item"><a href="/contact" className="nav-link">Contact</a></li>
            </ul>

            {/* User Section (Avatar + Logout) */}
            <div className="nav-auth">
              <div className="user-section">
                <div className="avatar" onClick={() => navigate('/profile')}>
                  {localStorage.getItem("email")?.charAt(0).toUpperCase() || "U"}
                </div>
                <button className="logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
          </>
        )}

        {/* SHOWN ONLY IF:
            1. NOT on an Auth Page
            2. User NOT Logged In 
        */}
        {!isAuthPage && !isLoggedIn && (
          <div className="nav-auth">
            <button className="login-btn" onClick={() => navigate('/login')}>
              Login
            </button>
            <button className="signup-btn" onClick={() => navigate('/register')}>
              Sign Up
            </button>
          </div>
        )}

      </div>
    </nav>
  )
}

export default Navbar