import React, { useState, useEffect } from 'react'
import './Navbar.css'
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const location = useLocation();

  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  // ✅ Check token on load
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [location]);

  // ✅ Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("email");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* Logo */}
        <div className="navbar-logo">
          <span className="logo-text" onClick={()=>navigate("/")}>
            <span className="logo-first-letter">R</span>entX
          </span>
        </div>

        {/* Hamburger */}
        <div className={`hamburger ${isOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Links */}
        <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
          <li className="nav-item"><a href="/" className="nav-link">Home</a></li>
          <li className="nav-item"><a href="/vehicles" className="nav-link">Browse Vehicles</a></li>
          <li className="nav-item"><a href="/about" className="nav-link">About Us</a></li>
          <li className="nav-item"><a href="/contact" className="nav-link">Contact</a></li>
        </ul>

        {/* 🔐 Auth Section */}
        <div className="nav-auth">

          {!isLoggedIn ? (
            <>
              <button className="login-btn" onClick={()=>navigate('/login')}>
                Login
              </button>
              <button className="signup-btn" onClick={()=>navigate('/register')}>
                Sign Up
              </button>
            </>
          ) : (
            <div className="user-section">
              
              {/* Avatar */}
              <div className="avatar" onClick={()=>navigate('/profile')}>
                {localStorage.getItem("email")?.charAt(0).toUpperCase() || "U"}
              </div>

              {/* Logout */}
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>

            </div>
          )}

        </div>
      </div>
    </nav>
  )
}

export default Navbar