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
      if (userChoice === "View_all_roles") {
        viewAllRoles();
      }
      if (userChoice === "Add_a_role") {
        addRole();
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
      if (userChoice === "Update_a_employee_role") {
        updateEmployeeRole();
      }
    });
}
// View all
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
function viewAllEmployees() {
  // Query database
  db.query("SELECT * FROM  employee", function (err, results) {
    if (err) throw err;
    console.table(results);
    promptQuestions();
  });
}

// Add 
function addDepartment() {
    inquirer.prompt ([
        {type: "input",
         name: "name",
         message: "Please enter department name",
    }
]).then((answer) =>{
    db.query("INSERT INTO department(name) VALUE(?)", answer.name,function (err, results) {
        if (err) throw err;
        console.table(results);
        promptQuestions();
        inquirer
      });
})
}
function addRole() {
    inquirer.prompt ([
        {type: "input",
         name: "title",
         message: "Please enter the role title",
    },
    {type: "input",
    name: "salary",
    message: "Please enter the salary",
    },
    {type: "input",
    name: "department_id",
    message: "Please enter the department_id",
    },
]).then((answer) =>{
    db.query("INSERT INTO role (title,salary,department_id) VALUES(?,?,?)",[answer.title,answer.salary,answer.department_id],function (err, results) {
        if (err) throw err;
        console.table(results);
        promptQuestions();
        inquirer
      });
})

    
  }