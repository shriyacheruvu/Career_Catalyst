const bcrypt = require("bcrypt");

async function generateHashedPassword(password) {
  const saltRounds = 10; // The number of hashing iterations
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  console.log("Hashed Password:", hashedPassword);
}

generateHashedPassword("admin"); // Replace with the actual password
