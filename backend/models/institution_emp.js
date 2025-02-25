const mongoose = require('mongoose');

// Student  schema
const institutionEmpSchema = new mongoose.Schema({
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
  designation: {
    type: String,
    required: true,
    
  },
  department: {
    type: String,
    required: true,
  }
  
},{ timestamps: true });

// Create a inst emp model
const Institution_Emp = mongoose.model('Institution_Emp', institutionEmpSchema);
module.exports = Institution_Emp;