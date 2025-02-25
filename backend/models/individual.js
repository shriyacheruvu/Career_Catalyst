const mongoose = require('mongoose');


const individualSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User schema
    required: true
  },

  // Any additional fields for Individual can go here (e.g., profile picture, bio, etc.)
  resumeFileName: { type: String }, // Stores the file name
  resumeFilePath: { type: String } 
});

const Individual = mongoose.model('Individual', individualSchema);
module.exports = Individual;
