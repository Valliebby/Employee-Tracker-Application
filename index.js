const inquirer = require('inquirer');
const fs = require('fs')
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
        value: 'Add_a_employee_role' },
        
    ]}])
  .then((answer) => {
    var userChoice = answer.choice
    console.log(userChoice)

  });