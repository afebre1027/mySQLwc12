const mysql = require("mysql2");

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    // Your MySQL username,
    user: "root",
    // Your MySQL password
    password: "Andrew1027.",
    database: "company",
  },
  console.log("Connected to the COMPANY database.")
);

module.exports = db;
