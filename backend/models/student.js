const mongoose = require('mongoose');

// Student  schema
const studentSchema = new mongoose.Schema({
  user_id:{
      type: mongoose.Schema.Types.ObjectId,
         ref: 'User', // Reference to the User schema
         required: true
   },
   institution_id:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Institution', // Reference to the Institution schema
    required: true
   },
  branch: {
    type: String,
    required: true,
    
  },
  year: {
    type: String,
    required: true,
  }
  
},{ timestamps: true });

// Create a User model
const Student = mongoose.model('Student', studentSchema);
module.exports = Student;
