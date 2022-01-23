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
      db.query(
        `INSERT INTO departments (department_name)
                VALUES (?)`,
        {
          name: answers.department,
        }
      ).then(promptUser);
      console.log("completed new department");

      promptUser();
    });
};

// add role
promptAddRole = () => {
  inquirer
    .prompt(
      {
        type: "input",
        name: "title",
        message: "What Role will be added?",
      },
      {
        type: "input",
        name: "salary",
        message: "Annual Salary Amount?",
      },
      {
        type: "input",
        name: "departmentId",
        message: "What department will this role go to?",
      }
    )
    .then((answers) => {
      db.query(
        `INSERT INTO roles (title, salary, department_id) 
                VALUES (?, ?, ?)`,
        {
          title: answers.title,
          salary: answers.salary,
          department_id: answers.department_id,
        }
      );
      console.log("completed new role");

      promptUser();
    });
};

// add employee
promptAddEmployee = () => {
  inquirer
    .prompt(
      {
        type: "input",
        name: "employeeFirst",
        message: "New employees First Name?",
      },
      {
        type: "input",
        name: "employeeLast",
        message: "New employees Last Name?",
      },
      {
        type: "input",
        name: "roleId",
        message: "New employees role ID?",
      }
    )
    .then((answers) => {
      db.query(
        `INSERT INTO employees (first_name, last_name, role_id)
                VALUES (?, ?, ?)`,
        {
          first_name: answers.first_name,
          last_name: answers.last_name,
          roles: answers.roles,
        }
      );
      console.log("New employee completed");

      promptUser();
    });
};
// finish running app
promptFinished = () => {};

promptUser();
