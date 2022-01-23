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
        ],
      },
    ])
    .then((selectedChoice) => {
      switch (selectedChoice.menu) {
        case "Department":
          promptDepartment();
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
      }
    });
};
