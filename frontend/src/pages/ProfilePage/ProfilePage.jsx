import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, ShieldCheck, LogOut, ClipboardList } from "lucide-react";
import { toast } from "react-toastify";
import "./ProfilePage.css";

export default function ProfilePage() {
  const navigate = useNavigate();
  
  // Initialize state with data from localStorage
  const [user] = useState({
    name: localStorage.getItem("name") || "User",
    email: localStorage.getItem("email") || "Not Available",
    role: localStorage.getItem("role") || "CUSTOMER",
  });

  // Security check: Redirect if no token exists
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    // Dispatch event so Navbar updates immediately
    window.dispatchEvent(new Event("authChange"));
    toast.success("Logged out successfully 🎉");
    navigate("/login");
  };

  return (
    <div className="profile-page">
      <div className="profile-card">
        
        {/* Header Section */}
        <div className="profile-header">
          <div className="profile-avatar">
            {user.email.charAt(0).toUpperCase()}
          </div>
          <h2>My Profile</h2>
          <span className={`role-badge ${user.role.toLowerCase()}`}>
            {user.role}
          </span>
        </div>

        {/* Info Body */}
        <div className="profile-body">
          
          {/* Full Name */}
          <div className="info-item">
            <div className="info-icon">
              <User size={20} />
            </div>
            <div className="info-text">
              <label>Full Name</label>
              <p>{user.name}</p>
            </div>
          </div>

          {/* Email */}
          <div className="info-item">
            <div className="info-icon">
              <Mail size={20} />
            </div>
            <div className="info-text">
              <label>Email Address</label>
              <p>{user.email}</p>
            </div>
          </div>

          {/* Permissions */}
          <div className="info-item">
            <div className="info-icon">
              <ShieldCheck size={20} />
            </div>
            <div className="info-text">
              <label>Account Permissions</label>
              <p>{user.role === "ADMIN" ? "System Administrator" : "Standard Customer"}</p>
            </div>
          </div>

          {/* 🔥 View Bookings Section */}
          <div className="info-item">
            <div className="info-icon highlight">
              <ClipboardList size={20} />
            </div>
            <div className="info-text">
              <label>Booking Management</label>
              <button 
                className="view-bookings-link" 
                onClick={() => navigate("/my-bookings")}
              >
                View My Bookings →
              </button>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="profile-footer">
          <button className="logout-action-btn" onClick={handleLogout}>
            <LogOut size={18} />
            Logout from Session
          </button>
        </div>

      </div>
    </div>
  );
}