const inquirer = require('inquirer');
const fs = require('fs')
const mysql = require('mysql2');
const { error } = require('console');
require ('dotenv').config()
// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: process.env.DB_PW,
      database: 'Employee_Tracker'
    },
    console.log(`Connected to the courses_db database.`)
  );
  promptQuestions()
function promptQuestions(){
inquirer
  .prompt([
    {
      type: 'list',
      name: 'choice',
      message: 'What would you like to do?',
      choices: [
    {
        name: 'View all employees', 
        value: 'View_all_employees' 
    },
    {   name: 'View one employee', 
        value: 'View_one_employee' },

    {   name: 'Add a employee', 
        value: 'Add_a_employee' },  
        
    {   name: 'View all roles', 
        value: 'View_all_roles' },
    
    {  
        name: 'Add a roles', 
        value: 'Add_a_roles' },

    {  
        name: 'View all department', 
        value: 'View_all_department' },
    {  
        name: 'Add a department', 
        value: 'Add_a_department' },
    
    {  
        name: 'Update a employee role', 
        value: 'Update_a_employee_role' },
        
    ]}])
  .then((answer) => {
    var userChoice = answer.choice
    console.log(userChoice)
    if(userChoice === 'View_all_department'){
        viewAllD()
    }
        if(userChoice === 'Add_a_department'){
            Add_a_department()
        }
        if(userChoice === 'View_all_roles'){
            View_all_roles()
        }
        if(userChoice === 'Add_a_role'){
            Add_a_role()
        }    
        if(userChoice === 'View_all_employee'){
            View_all_employee()
        }    
        if(userChoice === 'View_a_employee'){
            View_a_employee()
        }   
        if(userChoice === 'Add_a_employee'){
            Add_a_employee()
        }         
        if(userChoice === 'Update_a_employee_role'){
          Update_a_employee_role()
        }             
    
  });
}

  function viewAllD (){
  // Query database
  db.query('SELECT * FROM  department', function (err, results) {
    if (err) throw err
    console.table(results);
    promptQuestions()
  });
  }
  function Add_a_department(){
    // Query database
       db.query('SELECT * FROM  department', function (err, results) {
          if (err) throw err
          console.table(results);
          promptQuestions()
        });
      }

  function View_all_employee (){
    // Query database
    db.query('SELECT * FROM  employee', function (err, results) {
      if (err) throw err
      console.table(results);
      promptQuestions()
    });
    }
    function Add_a_employee(){
      // Query database
         db.query('SELECT * FROM  employee', function (err, results) {
            if (err) throw err
            console.table(results);
            promptQuestions()
          });
        }

    function View_all_roles (){
        // Query database
        db.query('SELECT * FROM  roles', function (err, results) {
          if (err) throw err
          console.table(results);
          promptQuestions()
        });
        }
  function Add_a_role(){
       // Query database
            db.query('SELECT * FROM  roles', function (err, results) {
              if (err) throw err
              console.table(results);
              promptQuestions()
            });
            }
 function View_a_employee(){
     // Query database
     db.query('SELECT * FROM  employee', function (err, results) {
       if (err) throw err
       console.table(results);
       promptQuestions()
      });
      }
 function Update_a_employee_role(){
        // Query database
        db.query('SELECT * FROM  roles', function (err, results) {
          if (err) throw err
          console.table(results);
          promptQuestions()
         });
         }