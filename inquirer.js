const db = require("./db/connection");
const inquirer = require("inquirer");
const cTable = require("console.table");

db.connect((err) => {
  if (err) throw err;
  console.log("================== employee tracker ===============");
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
          "Department",
          "Roles",
          "Employees",
          "Add Department",
          "Add Role",
          "Add Employee",
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
        case "Add Department":
          promptAddDepartment();
          break;
        case "Add Role":
          promptAddRole();
          break;
        case "Add Employee":
          promptAddEmployee();
          break;
        default:
          "Finished";
          promptFinished();
      }
    });
};

// display departments
promptDepartments = () => {
  db.query(`SELECT * FROM departments`, (err, rows) => {
    if (err) throw err;
    console.table(rows);

    promptUser();
  });
};

// display Roles
promptRoles = () => {
  const sql = `SELECT roles.title, roles.salary, departments.department_name
                AS department
                FROM roles
                LEFT JOIN departments
                ON roles.department_id = departments.id`;

  db.query(sql, (err, result) => {
    if (err) throw err;

    console.table(result);

    promptUser();
  });
};

// display Employee
promptEmployees = () => {
  const sql = `SELECT * FROM employees`;

  db.query(sql, (err, result) => {
    if (err) throw err;

    console.table(result);

    promptUser();
  });
};

// add department
promptAddDepartment = () => {
  inquirer
    .prompt({
      type: "input",
      name: "department_name",
      message: "What department would you like to add?",
    })
    .then((answers) => {
      db.query(
        `INSERT INTO departments (department_name)
                VALUES ('${answers.department_name}')`,

        (err) => {
          if (err) throw err;
          console.log("department added");

          promptUser();
        }
      );
    });
};

// add role
promptAddRole = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "What Role would you like to add?",
      },
      {
        type: "input",
        name: "salary",
        message: "What is the salary?",
        validate: (salary) => {
          if (salary) {
            return true;
          } else {
            console.log("input $");
            return false;
          }
        },
      },
    ])
    .then((answers) => {
      db.query(
        `INSERT INTO roles (title, salary)
                VALUES ('${answers.title}', '${answers.salary}')`,
        (err) => {
          if (err) throw err;
          console.log("role added");
          promptUser();
        }
      );
    });
};

promptAddEmployee = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "What is your first name?",
      },
      {
        type: "input",
        name: "last_name",
        message: "What is your last name?",
      },
      {
        type: "list",
        name: "role_name",
        message: "what is your role?",
        choices: [
          "Sales Lead",
          "Salesperson",
          "Lead Engineer",
          "Software Engineer",
          "Account Manager",
          "Accountant",
          "Legal Team Lead",
          "Lawyer",
        ],
      },
    ])
    .then((answers) => {
      db.query(
        `INSERT INTO employees (first_name, last_name, role_id)
                VALUES ('${answers.first_name}', '${answers.last_name}', '${answers.role_name}')`,

        (err) => {
          if (err) throw err;
          console.log("employee added");

          promptUser();
        }
      );
    });
};

// finish running app
promptFinished = () => {
  console.log("done");
};
