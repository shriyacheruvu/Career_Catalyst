const Individual = require("../models/individual");
const mongoose = require('mongoose');

// Register Individual


// Upload Resume and Update User Profile
  const uploadResume = async (req, res) => {
    try {
        console.log('Request body:', req.body); // Check if body is received
        console.log('Request params:', req.params);// Debugging: Check if file is received

        const userId = req.params.id; // Get user ID from URL params
        
        // Check if a file was uploaded
        if (!req.body) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // Update the user's resume details
        const obj=new mongoose.Types.ObjectId(userId);
        const updatedUser = await Individual.findOneAndUpdate({user_id:  obj }, {
            resumeFileName: req.body.resumeFileName,
            resumeFilePath: req.body.resumeFilePath
        }, { new: true });

        // Check if user exists
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ 
            message: 'Resume uploaded successfully', 
            fileName: req.body.resumeFileName
        });
    } catch (error) {
        console.error('Error: ',error); // Log the error for debugging
        res.status(500).json({ message: "An error occurred during file upload" });
    }
};
// Get All Individuals
// export const getIndividuals = async (req, res) => {
//     try {
//         const users = await Individual.find();
//         res.json(users);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

module.exports ={uploadResume};