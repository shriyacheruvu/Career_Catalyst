const express = require("express");
const Institution = require("../models/institution"); // Import your Institution model

const router = express.Router();

// Get all institutions
router.get("/", async (req, res) => {
    try {
        const institutions = await Institution.find(); // Fetch only relevant fields
        res.json(institutions);
    } catch (error) {
        console.error("Error fetching institutions:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
