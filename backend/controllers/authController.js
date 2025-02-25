const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Role = require("../models/role");
const UserRole = require("../models/userRole");

const Institution = require("../models/institution");
const Student = require("../models/student");
const InstitutionEmp = require("../models/institution_emp");



const registerIndividual = async (req, res) => {
  console.log("register Individual");
    try {
      const { name, email, password,confirmPassword } = req.body;
      if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
    }
      // Check if user already exists
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }
  
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user
      user = new User({ name, email, password: hashedPassword });
      await user.save();
      console.log("✅ New user registered:", user);
      let individual = new Individual({ user_id: user._id });
      await individual.save();
      console.log("✅ New individual registered:",individual);
  
      // Find or create "individual" role
      let role = await Role.findOne({ name: "individual" });
      if (!role) {
        return res.status(500).json({ message: "Role 'individual' not found" });
      }
  
      // Assign role to the user
      const userRole = new UserRole({ 
        user_id: user._id,  // User's ID
        role_id: role._id   // Role's ID (individual role)
      });
      await userRole.save();
  
      console.log("UserRole assigned:", userRole);
  
      res.status(201).json({ message: "User registered as individual", user });
  
    } catch (error) {
      console.error("❌ Error registering user:", error);
      res.status(500).json({ message: 'Server error.', error: error.message });
    }
  };
  
  const registerInstitution = async (req, res) => {
    try {
        const { institution_name, institution_address, name, email, password, proof } = req.body;

        // Check if institution already exists
        let existingInstitution = await Institution.findOne({ name: institution_name });
        if (existingInstitution) {
            return res.status(400).json({ message: 'Institution already exists' });
        }

        // Check if user already exists
        let existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Admin email is already registered' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
           name,
          email,
          password: hashedPassword
      });
      await user.save();
        // Create new institution
        const institution = new Institution({
            user_id:user._id,
            institution_name:institution_name,
            institution_address:institution_address,
            proof:proof
        });
        await institution.save();

        // Create institution admin user
       

        // Assign "institution_admin" role
        const adminRole = await Role.findOne({ name: 'institution_admin' });
        if (!adminRole) {
            return res.status(500).json({ message: 'Admin role not found' });
        }

        const userRole = new UserRole({
            user_id: user._id,
            role_id: adminRole._id,
           
        });
        await userRole.save();

        res.status(201).json({
            message: 'Institution registered successfully',
            institution: institution,
            admin: user
        });

    } catch (error) {
        console.error('Error in institution registration:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
   
// Institution Member Registration Controller
const registerInstitutionMember = async (req, res) => {
  const { name, email, password, role, institutionId, additionalInfo } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user instance
    const user = new User({
      name,
      email,
      password: hashedPassword
    });

    // Save the new user
   await user.save();

   
   console.log("🔎 Checking role:", role);
    // Find the role (student or employee)
    const roleDoc = await Role.findOne({ name: role });
    if (!roleDoc) {
      return res.status(400).json({ message: "Role not found" });
    }

    // Create the UserRole instance
    const userrole = new UserRole({
      user_id: user._id,
      role_id: roleDoc._id
    });

    // Save the UserRole
    await userrole.save();

    // Find the institution
    const institution = await Institution.findById(institutionId);
    if (!institution) {
      return res.status(400).json({ message: "Institution not found" });
    }

    // Create either a Student or InstitutionEmployee based on the role
    let institutionMember;
    if (role === "student") {
      institutionMember = new Student({
        user_id: user._id,
        institution_id: institution._id,
        branch: additionalInfo.branch,
        year: additionalInfo.year
      });
    } else if (role === "institution_emp") {
      institutionMember = new InstitutionEmp({
        user_id: user._id,
        institution_id: institution._id,
        designation: additionalInfo.designation,
        department: additionalInfo.department
      });
    } else {
      return res.status(400).json({ message: "Invalid role" });
    }

    // Save the institution member (student/employee)
    await institutionMember.save();

    // Optionally, generate a JWT token (you may want to send this back for login)
    const token = jwt.sign({ user_id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Return the response
    res.status(201).json({
      message: "Institution member registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      },
      token // Include the token if required
    });

  } catch (error) {
    console.error("Error registering institution member:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



// Login Controller
const login = async (req, res) => {
    console.log("Login function triggered..."); 
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required.' });
        }

        // Find user by email
        const user = await User.findOne({ email }) ;
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Compare passwords 
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password.' });
        }

        
        console.log("Fetching user role...");
        
       // Fetch the user's role from the UserRole collection
const userRole = await UserRole.findOne({ user_id: user._id }).populate("role_id");
console.log("UserRole:", userRole);

// Extract the role name
const role = userRole ? userRole.role_id.name : "user"; // Default to "user" if no role is found

// Generate JWT
const token = jwt.sign({ userId: user._id, role }, process.env.JWT_SECRET, { expiresIn: "1h" });

// Send response with token and role
console.log("User role:", role);
res.status(200).json({
    message: "Login successful.",
    token,
    user,
    role
});
    } catch (error) {
        console.error("Login error:", error); 
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};





module.exports = {  login,registerIndividual,registerInstitution ,registerInstitutionMember};



