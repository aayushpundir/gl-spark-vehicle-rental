import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import { toast } from 'react-toastify';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    drivingLicenseNumber: ''   // ✅ added
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.password || !formData.drivingLicenseNumber) {
      toast.error('All fields are required');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Invalid email format');
      return false;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await fetch('http://localhost:8080/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        toast.success('Registration successful! 🎉');
        navigate('/');
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || 'Registration failed');
      }
    } catch (err) {
      toast.error('Network error. Please try again.'+ err.message);
    } finally {
      setLoading(false);
      navigate('/login');
    }
  };

  return (
    <div className="page-container">
      <div className="register-container">
        <h2>Register</h2>

        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          {/* ✅ New Field */}
          <div className="form-group">
            <input
              type="text"
              name="drivingLicenseNumber"
              placeholder="Driving License Number"
              value={formData.drivingLicenseNumber}
              onChange={handleChange}
            />
          </div>

          <button type="submit" disabled={loading} className='btn-register'>
            {loading ? 'Registering...' : 'Register'}
          </button>

          <p className="login-text">
            Already have an account?{" "}
            <span onClick={() => navigate("/login")} className="login-link">
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;