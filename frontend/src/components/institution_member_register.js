import { useState , useEffect} from 'react'; // Ensure useState is imported
import styles from './styles/Institution_Member_Register.module.css'; // Import the CSS Module
import { Link } from 'react-router-dom';
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Institution_Member_Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    institution_id: "",  // Changed from institution_name to institution_id
    member_type: "",
    additionalInfo:{
    designation: "",      // Added for employees
    department: "",       // Added for employees
    branch: "",          // Added for students
    year: "", 
    },  // Added for students
    password: "",
    confirmPassword: ""
  });

  const [institutions, setInstitutions] = useState([]); // Stores fetched institutions
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchInstitutions = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/institutions");
        setInstitutions(response.data); 
      } catch (error) {
        console.error("❌ Error fetching institutions:", error.message);
      }
    };

    fetchInstitutions();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    setFormData((prev) => {
      // Check if the field belongs to additionalInfo
      if (["branch", "year", "designation", "department"].includes(name)) {
        return {
          ...prev,
          additionalInfo: {
            ...prev.additionalInfo,
            [name]: value
          }
        };
      }
  
      // Otherwise, update top-level fields
      return {
        ...prev,
        [name]: value
      };
    });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name || !formData.email || !formData.institution_id || !formData.member_type || !formData.password || !formData.confirmPassword) {
      alert("Please fill out all required fields.");
      return;
    }
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    
    // Handle employee-specific fields
    if (formData.member_type === "institution_emp" && (!formData.additionalInfo.designation || !formData.additionalInfo.department)) {
      alert("Please fill out all employee-specific fields.");
      return;
    }
    
    // Handle student-specific fields
    if (formData.member_type === "student" && (!formData.additionalInfo.branch || !formData.additionalInfo.year)) {
      alert("Please fill out all student-specific fields.");
      return;
    }
    
    // Send data to server
    console.log("✅ Form Submitted:", formData);
    const requestData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.member_type,
      institutionId: formData.institution_id,
      additionalInfo: formData.additionalInfo,
    };

    try {
      const response = await axios.post("http://localhost:5000/api/auth/institution_member_register", requestData);

      console.log("✅ Registration Successful:", response.data);
      if (response.status === 201) {
        alert("🎉 Registration Successful! Redirecting to login...");
        navigate("/login"); // Redirect to login page
      }

    } catch (error) {
      console.error("❌ Registration Failed:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.formWrapper}>
        <h2 className={styles.textCenter}>Register</h2>
        <form onSubmit={handleSubmit}>
          {/* Name Input */}
          <div className={styles.inputWrapper}>
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Enter your name"
              className={styles.inputField}
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Email Input */}
          <div className={styles.inputWrapper}>
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your institution email"
              className={styles.inputField}
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Institution Dropdown */}
          <div className={styles.dropdownWrapper}>
            <label htmlFor="institution_id">Select Institution</label>
            <select
              id="institution_id"
              name="institution_id"
              className={styles.dropdownField}
              value={formData.institution_id}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>Choose Institution</option>
              {institutions.map((institution) => (
                <option key={institution._id} value={institution._id}>
                  {institution.institution_name}
                </option>
              ))}
            </select>
          </div>

          {/* Member Type Selection */}
          <div className={styles.dropdownWrapper}>
            <label htmlFor="member_type">Select Member Type</label>
            <select
              id="member_type"
              name="member_type"
              className={styles.dropdownField}
              value={formData.member_type}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>Choose Member Type</option>
              <option value="student">Student</option>
              <option value="institution_emp">Employee</option>
            </select>
          </div>

          {/* Employee Fields */}
          {formData.member_type === "institution_emp" && (
            <>
              <div className={styles.inputWrapper}>
                <label htmlFor="designation">Designation</label>
                <input
                  id="designation"
                  type="text"
                  name="designation"
                  placeholder="Enter your designation"
                  className={styles.inputField}
                  value={formData.additionalInfo.designation}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className={styles.inputWrapper}>
                <label htmlFor="department">Department</label>
                <input
                  id="department"
                  type="text"
                  name="department"
                  placeholder="Enter your department"
                  className={styles.inputField}
                  value={formData.additionalInfo.department}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </>
          )}

          {/* Student Fields */}
          {formData.member_type === "student" && (
            <>
              <div className={styles.inputWrapper}>
                <label htmlFor="branch">Branch</label>
                <input
                  id="branch"
                  type="text"
                  name="branch"
                  placeholder="Enter your branch"
                  className={styles.inputField}
                  value={formData.additionalInfo.branch}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className={styles.inputWrapper}>
                <label htmlFor="year">Year of Study</label>
                <input
                  id="year"
                  type="number"
                  name="year"
                  placeholder="Enter year of study"
                  className={styles.inputField}
                  value={formData.additionalInfo.year}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </>
          )}

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
              required
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
              required
            />
          </div>

          {/* Register Button */}
          <button type="submit" className={styles.btn}>Register</button>
        </form>

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



export default  Institution_Member_Register;