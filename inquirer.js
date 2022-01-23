const db = require("./db/connection");


db.connect((err) => {
  if (err) throw err;
  console.log("inquirer connected");
});

const promptUser = () => {
  return inquirer
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

// display departments
promptDepartments = () => {
  const sql = `SELECT * FROM departments`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
  })
};
// // display Roles
// promptRoles = () => {};
// // display Employee
// promptEmployees = () => {};
// // add department
// promptAddDepartment = () => {};
// // add role
// promptAddRole = () => {};
// // add employee
// promptAddEmployee = () => {};
// // finish running app
// promptFinished = () => {};

