const mongoose = require('mongoose');

//Insitution
const institutionSchema = new mongoose.Schema({
  user_id:{
     type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User schema
        required: true
  },
  institution_name: {
    type: String,
    required: true,
  },
  institution_address: {
    type: String,
    required: true,
  },
  
  proof:{
    type: String,
    required:true,
  }
  
},{ timestamps: true });

// Create a User model
const Institution = mongoose.model('Institution', institutionSchema);
module.exports = Institution;
