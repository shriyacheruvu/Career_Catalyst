const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/authRoutes"); 
app.use("/api/auth", authRoutes);


const uploadRoutes = require("./routes/uploadRoutes");
const individualRoutes = require("./routes/individualRoutes");

app.use("/api/upload", uploadRoutes);
app.use("/api/individuals", individualRoutes);
app.use("/uploads", express.static("uploads")); 

const institutionRoutes = require("./routes/institutionRoutes");
app.use("/api/institutions", institutionRoutes);

// MongoDB Connection
const mongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017/ResumeAnalyser";
mongoose.connect(mongoURI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




