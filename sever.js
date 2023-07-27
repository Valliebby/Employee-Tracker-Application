// Dependance's needed
const inquirer = require("inquirer");
const fs = require("fs");
const mysql = require("mysql2");
const { error } = require("console");
require("dotenv").config();
const database = require ("./db/index.js")
// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // MySQL password
    password: process.env.DB_PW,
    database: "employees",
  },
  console.log(`Connected to the courses_db database.`)
);
promptQuestions();
function promptQuestions() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: "What would you like to do?",
        choices: [
          {
            name: "View All Employees",
            value: "View_Employees",
          },
          {
            name: "Add a Employee",
            value: "Add_Employee",
          },
          {
            name: "Remove a Employee",
            value: "Remove_Employee",
          },
          {
            name: "Update Employee Role",
            value: "Update_Employee_Role",
          },
          {
            name: "View All Roles",
            value: "View_all_Roles",
          },
          {
            name: "Add a Role",
            value: "Add_Role",
          },
          {
            name: "Remove a Role",
            value: "Remove_Role",
          },
          {
            name: "View All Departments",
            value: "View_Department",
          },
          {
            name: "Add Department",
            value: "Add_Department",
          },
          {
            name: "Delete Department",
            value: "Delete_Department",
          },
          {
            name: "Quit",
            value: "Quit",
          },
        ],
      },
    ])
    .then((res) => {
      let choice = res.choice;
      // Call the appropriate function depending on the user chose
      switch (choice) {
        case "View_Employees":
          viewEmployees();
          break;
        case "Add_Employee":
          addEmployee();
          break;
        case "Remove_Employee":
          removeEmployee();
          break;
        case "Update_Employee_Role":
          updateEmployeeRole();
          break;
        case "View_Department":
          viewDepartment();
          break;
        case "Add_Department":
          addDepartment();
          break;
        case "Delete_Department":
          deleteDepartment();
          break;
        case "View_Roles":
          viewRoles();
          break;
        case "Add_Role":
          addRole();
          break;
        case "Delete_Role":
          deleteRole();
          break;
        default:
          quit();
      }
    });
}

// View all employees
function viewEmployees() {
  db.query("select * from employee", (err, res) => {
    if (err) throw err;
    console.table(res);
   promptQuestions();
  });
}

// View all employees by department
function viewEmployeesByDepartment() {
  database.findAllDepartment()
    .then(([rows]) => {
  let department = rows;
  const departmentChoices = department.map(({ id, name }) => ({
    name: name,
    value: id,
  }));

  inquirer.prompt([
    {
      type: "list",
      name: "departmentId",
      message: "Which department would you like to see employees for?",
      choices: departmentChoices,
    },
  ])
    .then((res) => database.findAllEmployeesByDepartment(res.departmentId))
    .then(([rows]) => {
      let employees = rows;
      console.log("\n");
      console.table(employees);
    })
    .then(() => promptQuestions());
})}

// View all employees to a specific manager
function viewEmployeesByManager() {
  database.findAllEmployees().then(([rows]) => {
    let managers = rows;
    const managerChoices = managers.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id,
    }));

    inquirer.prompt([
      {
        type: "list",
        name: "managerId",
        message: "Which employee do you want to see direct reports for?",
        choices: managerChoices,
      },
    ])
      .then((res) => database.findAllEmployeesByManager(res.managerId))
      .then(([rows]) => {
        let employees = rows;
        console.log("\n");
        if (employees.length === 0) {
          console.log("The selected employee has no direct reports");
        } else {
          console.table(employees);
        }
      })
      .then(() => promptQuestions());
  });
}

// Delete an employee
function removeEmployee() {
  database.findAllEmployees().then(([rows]) => {
    let employees = rows;
    const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id,
    }));

    inquirer.prompt([
      {
        type: "list",
        name: "employeeId",
        message: "Which employee do you want to remove?",
        choices: employeeChoices,
      },
    ])
      .then((res) => database.removeEmployee(res.employeeId))
      .then(() => console.log("Removed employee from the database"))
      .then(() => promptQuestions());
  });
}

// Update an employee's role
function updateEmployeeRole() {
  database.findAllEmployees().then(([rows]) => {
    let employees = rows;
    const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id,
    }));

   inquirer.prompt([
      {
        type: "list",
        name: "employeeId",
        message: "Which employee's role do you want to update?",
        choices: employeeChoices,
      },
    ]).then((res) => {
      let employeeId = res.employeeId;
      database.findAllRoles().then(([rows]) => {
        let roles = rows;
        const roleChoices = roles.map(({ id, title }) => ({
          name: title,
          value: id,
        }));

       inquirer.prompt([
          {
            type: "list",
            name: "roleId",
            message: "Which role do you want to assign the selected employee?",
            choices: roleChoices,
          },
        ])
          .then((res) => database.updateEmployeeRole(employeeId, res.roleId))
          .then(() => console.log("Updated employee's role"))
          .then(() => promptQuestions());
      });
    });
  });
}

// Update an employee's manager
function updateEmployeeManager() {
  database.findAllEmployees().then(([rows]) => {
    let employees = rows;
    const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id,
    }));

   inquirer.prompt([
      {
        type: "list",
        name: "employeeId",
        message: "Which employee's manager do you want to update?",
        choices: employeeChoices,
      },
    ]).then((res) => {
      let employeeId = res.employeeId;
      database.findAllPossibleManagers(employeeId).then(([rows]) => {
        let managers = rows;
        const managerChoices = managers.map(
          ({ id, first_name, last_name }) => ({
            name: `${first_name} ${last_name}`,
            value: id,
          })
        );

       inquirer.prompt([
          {
            type: "list",
            name: "managerId",
            message:
              "Which employee do you want to set as manager for the selected employee?",
            choices: managerChoices,
          },
        ])
          .then((res) => database.updateEmployeeManager(employeeId, res.managerId))
          .then(() => console.log("Updated employee's manager"))
          .then(() => promptQuestions());
      });
    });
  });
}

// View all roles
function viewRoles() {
  db.query("select * from role", (err, res) => {
    if (err) throw err;
    console.table(res);
   promptQuestions();
  });
}

// Add a role
function addRole() {
  db.findAllDepartments().then(([rows]) => {
    let departments = rows;
    const departmentChoices = departments.map(({ id, name }) => ({
      name: name,
      value: id,
    }));

   inquirer.prompt([
      {
        name: "title",
        message: "What is the name of the role?",
      },
      {
        name: "salary",
        message: "What is the salary of the role?",
      },
      {
        type: "list",
        name: "department_id",
        message: "Which department does the role belong to?",
        choices: departmentChoices,
      },
    ]).then((role) => {
      db.createRole(role)
        .then(() => console.log(`Added ${role.title} to the database`))
        .then(() => promptQuestions());
    });
  });
}

// Delete a role
function removeRole() {
  db.findAllRoles().then(([rows]) => {
    let roles = rows;
    const roleChoices = roles.map(({ id, title }) => ({
      name: title,
      value: id,
    }));

   inquirer.prompt([
      {
        type: "list",
        name: "roleId",
        message:
          "Which role do you want to remove? (Warning: This will also remove employees)",
        choices: roleChoices,
      },
    ])
      .then((res) => db.removeRole(res.roleId))
      .then(() => console.log("Removed role from the database"))
      .then(() => promptQuestions());
  });
}

// View all deparments
function viewDepartments() {
  db.query("select * from department", (err, res) => {
    if (err) throw err;
    console.table(res);
   promptQuestions();
  });
}


// Add a department
function addDepartment() {
 inquirer.prompt([
    {
      name: "name",
      message: "What is the name of the department?",
    },
  ]).then((res) => {
    let name = res;
    db.createDepartment(name)
      .then(() => console.log(`Added ${name.name} to the database`))
      .then(() => promptQuestions());
  });
}

// Delete a department
function removeDepartment() {
  db.findAllDepartments().then(([rows]) => {
    let departments = rows;
    const departmentChoices = departments.map(({ id, name }) => ({
      name: name,
      value: id,
    }));

   inquirer.prompt({
      type: "list",
      name: "departmentId",
      message:
        "Which department would you like to remove? (Warning: This will also remove associated roles and employees)",
      choices: departmentChoices,
    })
      .then((res) => db.removeDepartment(res.departmentId))
      .then(() => console.log(`Removed department from the database`))
      .then(() => promptQuestions());
  });
}

// View all departments and show their total utilized department budget
function viewUtilizedBudgetByDepartment() {
  db.viewDepartmentBudgets()
    .then(([rows]) => {
      let departments = rows;
      console.log("\n");
      console.table(departments);
    })
    .then(() => promptQuestions());
}

// Add an employee
function addEmployee() {
 inquirer.prompt([
    {
      name: "first_name",
      message: "What is the employee's first name?",
    },
    {
      name: "last_name",
      message: "What is the employee's last name?",
    },
  ]).then((res) => {
    let firstName = res.first_name;
    let lastName = res.last_name;

    database.findAllRoles().then(([rows]) => {
      let roles = rows;
      const roleChoices = roles.map(({ id, title }) => ({
        name: title,
        value: id,
      }));

     inquirer.prompt({
        type: "list",
        name: "roleId",
        message: "What is the employee's role?",
        choices: roleChoices,
      }).then((res) => {
        let roleId = res.roleId;

        database.findAllEmployees().then(([rows]) => {
          let employees = rows;
          const managerChoices = employees.map(
            ({ id, first_name, last_name }) => ({
              name: `${first_name} ${last_name}`,
              value: id,
            })
          );

          managerChoices.unshift({ name: "None", value: null });

         inquirer.prompt({
            type: "list",
            name: "managerId",
            message: "Who is the employee's manager?",
            choices: managerChoices,
          })
            .then((res) => {
              let employee = {
                manager_id: res.managerId,
                role_id: roleId,
                first_name: firstName,
                last_name: lastName,
              };

              database.createEmployee(employee);
            })
            .then(() =>
              console.log(`Added ${firstName} ${lastName} to the database`)
            )
            .then(() => promptQuestions());
        });
      });
    });
  });
}

// Exit the application
function quit() {
  console.log("Goodbye!");
  process.exit();
}
