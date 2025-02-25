import React, { useState } from "react";
import styles from "./styles/Institution_Register.module.css";
import { Link } from 'react-router-dom';
import axios from 'axios'; 
import { useNavigate } from "react-router-dom";

export  function Institution_Register() {
  const [formData, setFormData] = useState({
    institution_name: '',
    institution_address: '',
    name: '',      
    email: '',
    password: '',
    confirmPassword:'',
    proof: null
});

const [message, setMessage] = useState("");
const [error, setError] = useState("");
const navigate = useNavigate();


const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prevData) => ({ ...prevData, [name]: value }));
};

// Handles file upload
const handleFileChange = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const fileData = new FormData();
  fileData.append("file", file);

  try {
      const response = await fetch("http://localhost:5000/api/upload", {
          method: "POST",
          body: fileData,
      });

      const data = await response.json();

      if (response.ok) {
          setFormData((prevData) => ({
              ...prevData,
              proof: data.fileUrl, // Save file URL
          }));
      } else {
          console.error("❌ File upload failed:", data.error);
          setError("File upload failed. Try again.");
      }
  } catch (err) {
      console.error("❌ Error uploading file:", err);
      setError("An error occurred while uploading the file.");
  }
};



const handleSubmit = async (e) => {
    e.preventDefault();

    // const formDataToSend = new FormData();
    // for (let key in formData) {
    //     formDataToSend.append(key, formData[key]);
    // }
    console.log("📤 Sending formData:", formData);
    console.log("Proof:", formData.proof);
    try {
        const response = await axios.post( "http://localhost:5000/api/auth/institution_register",formData );
        console.log("✅ Registration Successful:", response.data);
        setMessage(response.data.message);
        
        if (response.status === 201) {
          alert("🎉 Registration Successful! Redirecting to login...");
          navigate("/login"); // Redirect to login page
        }
    } catch (err) {
        setError(err.response?.data?.message || "Something went wrong");
        setMessage("");
    }
};
  return (
    <div className={styles.formContainer}>
      
      <form onSubmit={handleSubmit} className={styles.form}>
      <h2 className={styles.heading}>Institution Registration</h2>
        {/* Institution Name */}
        <div className={styles.inputWrapper}>
          <label htmlFor="institution_name" className={styles.label}>
            Institution Name
          </label>
          <input
            id="institution_name"
            name="institution_name"
            type="text"
            placeholder="Enter institution name"
            className={styles.inputField}
            value={formData.institution_name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Institution Address */}
        <div className={styles.inputWrapper}>
          <label htmlFor="institution_address" className={styles.label}>
            Institution Address
          </label>
          <textarea
            id="institution_address"
            name="institution_address"
            placeholder="Enter institution address"
            className={styles.textArea}
            value={formData.institution_address}
            onChange={handleChange}
            required
          />
        </div>

        {/* Admin Name */}
        <div className={styles.inputWrapper}>
          <label htmlFor="name" className={styles.label}>
            Admin Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter admin name"
            className={styles.inputField}
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Email Address */}
        <div className={styles.inputWrapper}>
          <label htmlFor="email" className={styles.label}>
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter email address"
            className={styles.inputField}
            value={formData.email}
            onChange={handleChange}
            required
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
                    onChange={handleChange}
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
                    onChange={handleChange}
                  />
                </div>

        {/* Proof of Registration */}
        <div className={styles.inputWrapper}>
          <label htmlFor="proof" className={styles.label}>
            Proof of Registration
          </label>
          <input
            id="proof"
            name="proof"
            type="file"
            className={styles.fileInput}
            onChange={handleFileChange}
            required
          />
        </div>


        {/* Submit Button */}
        <button type="submit" className={styles.submitButton}>
          Register
        </button>
        <div className={styles.textCenter}>
          <p>Already have an account? <Link to="/login">Sign In</Link></p>
        </div>
      </form>

    </div>
  );
}

export default Institution_Register;
