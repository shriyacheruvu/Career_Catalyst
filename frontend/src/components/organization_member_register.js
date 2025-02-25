import { useState } from 'react'; // Ensure useState is imported
import styles from './styles/Institution_Member_Register.module.css'; // Import the CSS Module
import { Link } from 'react-router-dom';

function Organization_Member_Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    member_type: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform basic validation (optional)
    if (!formData.username || !formData.email || !formData.member_type || !formData.password || !formData.confirmPassword) {
      alert('Please fill out all fields.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    // Handle the form submission (e.g., send to server)
    console.log('Form Data:', formData);
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.formWrapper}>
        <h2 className={styles.textCenter}>Register</h2>

        {/* Username Input */}
        <div className={styles.inputWrapper}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            name="username"
            placeholder="Enter your name"
            className={styles.inputField}
            value={formData.username}
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

        {/* Member Type Dropdown */}
        <div className={styles.dropdownWrapper}>
          <label htmlFor="member_type">Select Member Type</label>
          <select
            id="member_type"
            name="member_type"
            className={styles.dropdownField}
            value={formData.member_type}
            onChange={handleInputChange}
          >
            <option value="" disabled>
              Choose Member Type
            </option>
            <option value="student">Student</option>
            <option value="employee">Employee</option>
          </select>
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
        <button className={styles.btn} onClick={handleSubmit}>
          Register
        </button>

        {/* Already Registered */}
        <div className={styles.textCenter}>
          <p>
            Already have an account? <Link to="/login">Log In</Link>
          </p>
          <p>
            Want to register an institution? <Link to="/institution_register">Register Here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Organization_Member_Register;