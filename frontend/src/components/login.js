import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles/Login.module.css'; // Import the CSS module
import { Link } from 'react-router-dom';


export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        // Extract first role from roles array (if available)
        const role = data.role || "user";
        console.log("Final role value:", role);

    
        // Store the role in localStorage or session as needed
        localStorage.setItem("role", role);

        // Redirect based on role
        if (role === "admin") {
          navigate("/admin_dashboard");
        } else if(role === "student") {
          navigate("/student_dashboard"); // Redirect regular users
        }else if(role=== "individual"){
          navigate("/individual_dashboard");
        }else if(role==="institution_admin"){
          navigate("/institution_admin_dashboard")
        }else if(role==="institution_emp"){
          navigate("/institution_emp_dashboard");
        }
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred while logging in. Please try again.");
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.formWrapper}>
        <h2 className={styles.textCenter}>Login</h2>

        {/* Email Input */}
        <div className={styles.inputWrapper}>
          <label htmlFor="email">Email address</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            className={styles.inputField}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password Input */}
        <div className={styles.inputWrapper}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            className={styles.inputField}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Sign In Button */}
        <button className={styles.btn} onClick={handleLogin}>
          Sign in
        </button>

        {/* Register Link */}
        <div className={styles.textCenter}>
          <p>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;

