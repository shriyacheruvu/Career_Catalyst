const express = require("express");
const multer = require("multer");
const path = require("path");
const Role = require("../models/role");
const UserRole = require("../models/userRole");
const { uploadResume } = require("../controllers/individualController");

const router = express.Router();

// Configure storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Save files in "uploads" folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    },
});

const upload = multer({ storage });

// File upload route
router.post("/", upload.single("file"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "File upload failed" });
    }
    res.json({ fileUrl: `/uploads/${req.file.filename}` });
});
router.post("/:id", upload.single("dummy"), uploadResume);




module.exports = router;
