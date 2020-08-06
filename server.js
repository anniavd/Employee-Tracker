const mysql = require('mysql2');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  // Your MySQL username
  user: 'root',
  // Your MySQL password
  password: 'Basedatos20*',
  database: 'department_db'
});

connection.connect(err => {
  if (err) throw err;
  console.log('connected as id ' + connection.threadId + '\n');
});


function showOptions() {
  //console.log("\n** Adding a employee **\n");

  inquirer.prompt([
    {
      type: 'list',
      name: 'selectOptions',
      message: 'What would you like to do?',
      choices: [
        ' Would you like to view all the Departments?',
        'Would you like to view all the Role?',
        'Would you like to view all the Employee?',
        'Would you like to add a Department?',
        'Would you like to add a Role?',
        'Would you like to add a Employee?',
        'Would you like to update a employee role?'
      ]

    }
  ]).then(options => {
    switch (options.selectOptions) {
      case "Would you like to view all the Departments?":
        break;
      case 'Would you like to view all the Role?':
        break;
      case 'Would you like to view all the Employee?':
        break;
      case 'Would you like to add a Department?':
        break;
      case 'Would you like to add a Role?':
        break;
      case 'Would you like to add a Employee?':
        break;

      case 'Would you like to update a employee role?':
        break;
      // default:
      //call other function();
    }
  });
}

showOptions();