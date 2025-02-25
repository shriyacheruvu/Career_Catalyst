const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const { uploadResume } = require('../controllers/individualController');

// POST route for uploading resumes


// // Create a new individual profile
// router.post("/", async (req, res) => {
//   try {
//     const { userId, resume } = req.body;

//     // Check if the user exists
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Create an individual profile
//     const individual = new Individual({ user: userId, resume });
//     await individual.save();
//     res.status(201).json(individual);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Get all individual profiles
// router.get("/", async (req, res) => {
//   try {
//     const individuals = await Individual.find().populate("user", "name email");
//     res.status(200).json(individuals);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // // Get an individual profile by ID
// // // router.get("/:id", async (req, res) => {
// // //   try {
// // //     const individual = await Individual.findById(req.params.id).populate("user", "name email");
// // //     if (!individual) {
// // //       return res.status(404).json({ message: "Individual not found" });
// // //     }
// // //     res.status(200).json(individual);
// // //   } catch (error) {
// // //     res.status(500).json({ message: error.message });
// // //   }
// // // });

// // // Update an individual profile
// // router.put("/:id", async (req, res) => {
// //   try {
// //     const { resume } = req.body;
// //     const updatedIndividual = await Individual.findByIdAndUpdate(
// //       req.params.id,
// //       { resume },
// //       { new: true }
// //     );
// //     if (!updatedIndividual) {
// //       return res.status(404).json({ message: "Individual not found" });
// //     }
// //     res.status(200).json(updatedIndividual);
// //   } catch (error) {
// //     res.status(500).json({ message: error.message });
// //   }
// // });

// // // Delete an individual profile
// // router.delete("/:id", async (req, res) => {
// //   try {
// //     const deletedIndividual = await Individual.findByIdAndDelete(req.params.id);
// //     if (!deletedIndividual) {
// //       return res.status(404).json({ message: "Individual not found" });
// //     }
// //     res.status(200).json({ message: "Individual deleted successfully" });
// //   } catch (error) {
// //     res.status(500).json({ message: error.message });
// //   }
// // });

module.exports = router;
