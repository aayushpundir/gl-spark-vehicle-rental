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
    role: "USER" // default
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
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8080/login",
        {
          email: formData.email,
          password: formData.password
          // 🔥 role usually NOT required in login API
        }
      );

      const data = response.data;

      // Optional check (extra security UI side)
      if (data.role !== formData.role) {
        toast.error("Selected role does not match user role ❌");
        setLoading(false);
        return;
      }

      // Save token
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("email", data.email);

      toast.success("Login successful 🎉");

      // Role-based navigation 🔥
      setTimeout(() => {
        if (data.role === "ADMIN") {
          navigate("/admin-dashboard");
        } else {
          navigate("/dashboard");
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
              value="USER"
              checked={formData.role === "USER"}
              onChange={handleChange}
            />
            User
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

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}