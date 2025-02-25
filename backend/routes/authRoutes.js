const express = require("express");
const router = express.Router();
const { login,registerIndividual ,registerInstitution,registerInstitutionMember} = require('../controllers/authController');


router.post("/login", login);

//router.post("/individual_register",registerIndividual);
router.post("/individual_register", (req, res, next) => {
    console.log("📩 Received request at /api/auth/individual_register");
    console.log("📜 Request Body:", req.body);
    next(); // Pass request to controller
  }, registerIndividual);

  router.post("/institution_register", (req, res, next) => {
    console.log("📩 Received request at /api/auth/institution_register");
    console.log("📜 Request Body:", req.body);
    next(); // Pass request to controller
  }, registerInstitution);

  router.post("/institution_member_register", (req, res, next) => {
    console.log("📩 Received request at /api/auth/institution_member_register");
    console.log("📜 Request Body:", req.body);
    next(); // Pass request to controller
  }, registerInstitutionMember);

module.exports = router;
