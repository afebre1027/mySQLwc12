const db = require("./db/connection");
const express = require("express");
const apiRoutes = require("./routes");
const inquirer = require("inquirer");
const cTable = require("console.table");
console.table(["apples", "oranges", "bana"]);
const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// using the  api Routes folder
app.use("/api/", apiRoutes);

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

// Start server after DB connection
db.connect((err) => {
  if (err) throw err;
  console.log("Database COMPANY connected.");
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
