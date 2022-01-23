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

db.connect((err) => {
  if (err) throw err;
  console.log("inquirer connected");
  promptUser();
});

const promptUser = () => {
   inquirer
    .prompt([
      {
        type: "list",
        name: "menu",
        message: "Please select a option",
        choices: [
          "Departments",
          "Roles",
          "Employees",
          "Add Department",
          "Add Role",
          "Add Employee",
          "Change Employee Role",
          "Finished",
        ],
      },
    ])
    .then((selectedChoice) => {
      switch (selectedChoice.menu) {
        case "Department":
          promptDepartments();
          break;
        case "Roles":
          promptRoles();
          break;
        case "Employees":
          promptEmployees();
          break;
        case "add Department":
          promptAddDepartment();
          break;
        case "add Role":
          promptAddRole();
          break;
        case "add Employee":
          promptAddEmployee();
          break;
        case "Change Employee Role":
          promptChangeRole();
          break;
        default:
          "Finished";
          promptFinished();
      }
    });
};
// promptUser().then((answers) => console.log(answers));

// display departments
promptDepartments = () => {
  db.query(`SELECT * FROM departments`, (err, rows) => {
    if (err) throw err;
  });
};

// display Roles
promptRoles = () => {
  const sql = `SELECT * FROM roles`;
  db.query(sql, (err, result) => {
    if (err) throw err;

    console.table(result);

    promptUser();
  });
};

// display Employee
promptEmployees = () => {
  const sql = `SELECT * FROM employees`;
  db.query(sql, (err, rows) => {
    if (err) throw err;

    console.table(rows);

    promptUser();
  });
};
// add department
promptAddDepartment = () => {
   inquirer
    .prompt({
      type: "input",
      name: "department",
      message: "What department would you like to add?",
    })
    .then((answers) => {
      db.query(`INSERT INTO departments SET ?`, {
        name: answers.department,
      });
      console.log("completed new department");

      promptUser();
    });
};
// add role
promptAddRole = () => {};
// add employee
promptAddEmployee = () => {};
// finish running app
promptFinished = () => {};

promptUser();

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
