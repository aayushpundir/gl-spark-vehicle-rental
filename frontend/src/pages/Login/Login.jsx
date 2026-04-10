import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "CUSTOMER" // Default role
  });

  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle login
  const handleSubmit = async (e) => {
    console.log(formData.role);
    e.preventDefault();
    setLoading(true);

    try {
      // ✅ API Selection logic - using uppercase "ADMIN"
      let apiUrl = "";
      if (formData.role === "ADMIN") {
        apiUrl = "http://localhost:8080/api/users/login/admin";
      } else {
        apiUrl = "http://localhost:8080/api/users/login";
      }

      const response = await axios.post(apiUrl, {
        email: formData.email,
        password: formData.password
      });

      const data = response.data;

      // ✅ Role check (Case-insensitive comparison for safety)
      if (data.role.toUpperCase() !== formData.role.toUpperCase()) {
        toast.error("Selected role does not match user account role ❌");
        setLoading(false);
        return;
      }

      // ✅ Save session data
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("email", data.email);
      localStorage.setItem("name", data.name);

      // 🔥 Notify Navbar/App of state change
      window.dispatchEvent(new Event("authChange"));

      toast.success("Login successful 🎉");

      // ✅ Role-based navigation
      setTimeout(() => {
        if (data.role === "ADMIN") {
          navigate("/admin-dashboard");
        } else {
          navigate("/");
        }
      }, 1500);

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Invalid credentials ❌"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <div className="input-group">
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {/* 🔥 Fixed Radio Buttons */}
        <div className="radio-group">
          <label className="radio-label">
            <input
              type="radio"
              name="role"
              value="CUSTOMER"
              checked={formData.role === "CUSTOMER"}
              onChange={handleChange}
            />
            <span>Customer</span>
          </label>

          <label className="radio-label">
            <input
              type="radio"
              name="role"
              value="ADMIN"
              checked={formData.role === "ADMIN"} // Corrected comparison
              onChange={handleChange}
            />
            <span>Admin</span>
          </label>
        </div>

        <button type="submit" disabled={loading} className="btn-login">
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="register-text">
          Not registered?{" "}
          <span onClick={() => navigate("/register")} className="register-link">
            Create an account
          </span>
        </p>
      </form>
    </div>
  );
}