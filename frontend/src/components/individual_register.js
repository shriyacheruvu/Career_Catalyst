import React, { useState } from 'react';
import axios from 'axios';  // ✅ Import Axios
import styles from './styles/Individual_Register.module.css';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

function Individual_Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    console.log("🟡 Register button clicked"); 
    console.log('🔵 Sending Form Data:', formData);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/auth/individual_register", formData);
      console.log("✅ Registration Successful:", response.data);
      setSuccessMessage("Registration successful! You can now log in.");
      if (response.status === 201) {
        alert("🎉 Registration Successful! Redirecting to login...");
        navigate("/login"); // Redirect to login page
      }
       
    } catch (error) {
      console.error("❌ Registration Error:", error.response?.data || error.message);
      setError(error.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.formWrapper}>
        <h2 className={styles.textCenter}>Register</h2>

        {/* Username Input */}
        <div className={styles.inputWrapper}>
          <label htmlFor="name">Username</label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Enter your name"
            className={styles.inputField}
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>

        {/* Email Input */}
        <div className={styles.inputWrapper}>
          <label htmlFor="email">Email address</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Enter your email"
            className={styles.inputField}
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>

        {/* Password Input */}
        <div className={styles.inputWrapper}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Enter your password"
            className={styles.inputField}
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>

        {/* Confirm Password Input */}
        <div className={styles.inputWrapper}>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            className={styles.inputField}
            value={formData.confirmPassword}
            onChange={handleInputChange}
          />
        </div>

        {/* Register Button */}
        <button className={styles.btn} onClick={handleSubmit}>Register</button>

        <div className={styles.textCenter}>
          <p>Already have an account? <Link to="/login">Sign In</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Individual_Register;

