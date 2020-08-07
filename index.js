const inquirer = require('inquirer');
const dept = require('./department');
const role=require('./role');
const employee=require('./employee')
const db = require('./db/database');

function showOptions() {
  console.log("\n** Select options **\n");

  inquirer.prompt([
    {
      type: 'list',
      name: 'selectOptions',
      message: 'What would you like to do?',
      choices: [
        'View all the Departments',
        'Add a Department',
        'Delete a Department',
        'View all the Role',
        'Add a Role',
        'Delete a Role',
        'View all the Employee',   
        'Add a Employee',
        'Delete a Employee',
        'Update a employee role',
        'Quit'           
      ]

    }
  ]).then(options => {
    switch (options.selectOptions) {
      case 'View all the Departments':
        dept.showDepartments();
        break;
      case 'Add a Department':
        dept.addDepartment();
        break;
      case 'Delete a Department':
        break;
      case 'View all the Role':  
      role.showRoles();     
        break;
      case 'Add a Role': 
       role.addRole();      
        break;
      case'Delete a Role':
        break;
      case 'View all the Employee':
        employee.showEmployees();
        break;
      case 'Add a Employee':
        employee.addEmployee();
        break;
      case 'Delete a Employee':
        break;
      case 'Update a employee role':
        break;
      default:
      db.end();
    }
  });
  
}


showOptions();