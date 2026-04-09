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
    role: "CUSTOMER" // default
  });

  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // 🔥 Handle login with dynamic API
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ✅ Decide API based on role
      let apiUrl = "";

      if (formData.role === "ADMIN") {
        apiUrl = "http://localhost:8080/api/users/admin/login";
      } else {
        apiUrl = "http://localhost:8080/api/users/login";
      }

      const response = await axios.post(apiUrl, {
        email: formData.email,
        password: formData.password
      });

      const data = response.data;

      // Optional check (extra safety)
      if (data.role !== formData.role) {
        toast.error("Selected role does not match user role ❌");
        setLoading(false);
        return;
      }

      // ✅ Save data
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("email", data.email);

      // 🔥 Notify Navbar instantly
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

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        {/* 🔥 Role Selection */}
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="role"
              value="CUSTOMER"
              checked={formData.role === "CUSTOMER"}
              onChange={handleChange}
            />
            Customer
          </label>

          <label>
            <input
              type="radio"
              name="role"
              value="ADMIN"
              checked={formData.role === "ADMIN"}
              onChange={handleChange}
            />
            Admin
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