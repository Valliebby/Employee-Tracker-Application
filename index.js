const inquirer = require("inquirer");
const fs = require("fs");
const mysql = require("mysql2");
const { error } = require("console");
const { Input } = require("@chakra-ui/react");
require("dotenv").config();
// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // MySQL password
    password: process.env.DB_PW,
    database: "Employee_Tracker",
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
            name: "View all employees",
            value: "View_all_employees",
          },
          { name: "View one employee", value: "View_one_employee" },

          { name: "Add a employee", value: "Add_a_employee" },

          { name: "View all roles", value: "View_all_roles" },

          {
            name: "Add a roles",
            value: "Add_a_roles",
          },

          {
            name: "View all department",
            value: "View_all_department",
          },
          {
            name: "Add a department",
            value: "Add_a_department",
          },

          {
            name: "Update a employee role",
            value: "Update_a_employee_role",
          },
          {
            name: "Quit",
            value: "Quit",
          },
        ],
      },
    ])
    .then((answer) => {
      var userChoice = answer.choice;
      console.log(userChoice);
      if (userChoice === "View_all_department") {
        viewAllDepartment();
      }
      if (userChoice === "Add_a_department") {
        addDepartment();
      }
      if (userChoice === "Remove_a_department") {
        removeDepartment();
      }
      if (userChoice === "View_all_roles") {
        viewAllRoles();
      }
      if (userChoice === "Add_a_role") {
        addRole();
      }
      if (userChoice === "Remove_a_role") {
        removeRole();
      }
      if (userChoice === "View_all_employees") {
        viewAllEmployees();
      }
      if (userChoice === "View_a_employee") {
        viewEmployee();
      }
      if (userChoice === "Add_a_employee") {
        addEmployee();
      }
      if (userChoice === "Remove_a_employee") {
        removeEmployee();
      }
      if (userChoice === "Update_a_employee_role") {
        updateEmployeeRole();
      }
      if (userChoice === "Quit") {
        Quit();
      }
    });
}
// View all Department Function.
function viewAllDepartment() {
  // Query database
  db.query("SELECT * FROM  department", function (err, results) {
    if (err) throw err;
    console.table(results);
    promptQuestions();
  });
}
function viewAllRoles() {
  // Query database
  db.query("SELECT * FROM  role", function (err, results) {
    if (err) throw err;
    console.table(results);
    promptQuestions();
  });
}
// View all Employees Function.
function viewAllEmployees() {
  // Query database
  db.query("SELECT * FROM  employee", function (err, results) {
    if (err) throw err;
    console.table(results);
    promptQuestions();
  });
}

// Adding a Department Function.
function addDepartment() {
  inquirer
    .prompt([
      { type: "input", name: "name", message: "Please enter department name" },
    ])
    .then((answer) => {
      db.query(
        "INSERT INTO department(name) VALUE(?)",
        answer.name,
        function (err, results) {
          if (err) throw err;
          console.table(results);
          promptQuestions();
          inquirer;
        }
      );
    });
}
// Adding a Role Function.
function addRole() {
  inquirer
    .prompt([
      { type: "input", name: "title", message: "Please enter the role title" },
      { type: "input", name: "salary", message: "Please enter the salary" },
      {
        type: "input",
        name: "department_id",
        message: "Please enter the department ID",
      },
    ])
    .then((answer) => {
      db.query(
        "INSERT INTO role (title,salary,department_id) VALUES(?,?,?)",
        [answer.title, answer.salary, answer.department_id],
        function (err, results) {
          if (err) throw err;
          console.table(results);
          promptQuestions();
          inquirer;
        }
      );
    });
}
// Adding a Employee Function.
function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "Please enter the employee's first name",
      },
      {
        type: "input",
        name: "last_name",
        message: "Please enter the employee's last name",
      },
      { type: "input", name: "role_id", message: "Please enter the role_id" },
    ])
    .then((answer) => {
      db.query(
        "INSERT INTO role (first_name,last_name,role_id) VALUES(?,?,?)",
        [answer.fist_name, answer.last_name, answer.role_id],
        function (err, results) {
          if (err) throw err;
          console.table(results);
          promptQuestions();
          inquirer;
        }
      );
    });
}
// Removing a Department Function.
function removeDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "department_id",
        message: "Please enter the department ID you would like to remove",
      },
    ])
    .then((answer) => {
      db.query(
        "INSERT INTO department (department_id) VALUES(?,?,?)",
        [answer.department_id],
        function (err, results) {
          if (err) throw err;
          console.table(results);
          promptQuestions();
          inquirer;
        }
      );
    });
}

// Removing a Employee Function.
function removeEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "Please enter the employee's first name you are removing",
      },
      {
        type: "input",
        name: "last_name",
        message: "Please enter the employee's last name",
      },
      { type: "input", name: "role_id", message: "Please enter the role_id" },
    ])
    .then((answer) => {
      db.query(
        "INSERT INTO role (first_name,last_name,role_id) VALUES(?,?,?)",
        [answer.fist_name, answer.last_name, answer.role_id],
        function (err, results) {
          if (err) throw err;
          console.table(results);
          promptQuestions();
          inquirer;
        }
      );
    });
}
// Removing a Role Function.
function removeRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "tile",
        message: "Please enter the role you would like to remove",
      },
      { type: "input", name: "salary", message: "Please enter the salary" },
      {
        type: "input",
        name: "department_id",
        message: "Please enter the department_id",
      },
    ])
    .then((answer) => {
      db.query(
        "INSERT INTO role (first_name,last_name,department_id) VALUES(?,?,?)",
        [answer.title, answer.salary, answer.department_id],
        function (err, results) {
          if (err) throw err;
          console.table(results);
          promptQuestions();
          inquirer;
        }
      );
    });
}
function updateEmployeeRole() {
    prompt([
        {
          type: "input",
          message: "Enter employee ID to update role",
          name: "employee_id",
        },
        {
          type: "input",
          message: "Enter new employee ID",
          name: "role_id",
        },
      ])
      .then((answer) => {
        db.query(
          "INSERT INTO role (first_name,last_name,department_id) VALUES(?,?,?)",
          [answer.employee_id, answer.role_id],
          function (err, results) {
            if (err) throw err;
            console.table(results);
            promptQuestions();
            inquirer;
          }
        );
      });
  }
  promptQuestions();