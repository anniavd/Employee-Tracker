const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
let deptoChoice = [];
let roleChoice = [];
let employeName=[];




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
  menu();
});




function menu() {
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
        showDepartments();
        break;
      case 'Add a Department':
        addDepartment();
        break;
      case 'Delete a Department':
        deleteApartment();
        break;
      case 'View all the Role':
        showRoles();
        break;
      case 'Add a Role':
        addRole();
        break;
      case 'Delete a Role':
        role.deleteRole();
        break;
      case 'View all the Employee':
        showEmployees();
        break;
      case 'Add a Employee':
        addEmployee();
        break;
      case 'Delete a Employee':
        employee.deleteEmployee();
        break;
      case 'Update a employee role':
        break;
      default:
        connection.end();
    }
  });

}


// show all department
function showDepartments() {
  //sql consult select
  connection.query(`SELECT * FROM department`, (err, res) => {
    if (err) throw err;

    if (res.length > 0) {
      console.log('\n')
      console.log('Departments')
      console.log('\n')
      console.table(res);
    }
    menu();
  });

}
// show all the role info 
function showRoles() {
  //sql consult select
  connection.query(`SELECT role.title AS job_title,role.id,department.name AS department_name,role.salary  FROM  role LEFT JOIN department ON role.department_id=department.id`,
    (err, res) => {

      if (err) throw err;

      if (res.length > 0) {
        console.log('\n')
        console.log('Roles')
        console.log('\n')
        console.table(res);
      }
      menu();
    });
}
// show all the employee info
function showEmployees() {
  //sql consult select
  connection.query(`SELECT employee.id, employee.first_name,employee.last_name,role.title AS job_title,role.salary,
       CONCAT(manager.first_name ," ", manager.last_name) AS Manager FROM  employee LEFT JOIN role ON employee.role_id=role.id LEFT JOIN employee  manager ON manager.id = employee.manager_id`, (err, res) => {
   // console.log(res);

    if (err) throw err;

    if (res.length > 0) {
      console.log('\n')
      console.log('Employees')
      console.log('\n')
      console.table(res);
    }
    menu();
  });

}



//add a department to the datebase
function addDepartment() {

  inquirer.prompt([

    {
      type: 'input',
      name: 'nameDpto',
      message: 'What is your department name?',
      validate: name => {           //validation the entry
        if (name) {
          return true;
        } else {
          console.log('\n Please enter a department name!');
          return false;
        }
      }
    }
  ])
    .then(anserw => {
      let nameDepartment = anserw.nameDpto;
      //sql consult insert
      connection.query('INSERT INTO department SET name=? ', [nameDepartment], (err, res) => {
        if (err) throw err;

        console.log(res.affectedRows + ' department inserted!\n');
        menu();
      })
    })

}
function deleteApartment() {

  inquirer.prompt([

    {
      type: 'input',
      name: 'deptoId',
      message: 'What is the department id ?',
      validate: idInput => {           //validation the entry
        if (idInput) {
          return true;
        } else {
          console.log('\n Please enter the department id!');
          return false;
        }
      }
    }
  ])
    .then(anserw => {
      let deleteId = anserw.deptoId;
      //sql consult delete
      connection.query('DELETE FROM department WHERE id=? ', [deleteId], (err, res) => {
        if (err) throw err;

        console.log(res.affectedRows + ' department delete!\n');
        menu();
      })
    })
}

function helperArray() {
  connection.query(`SELECT * FROM department `, (err, res) => {

    if (err) throw err;   
    res.forEach(dpto => {
      deptoChoice.push({ name:dpto.name, value: dpto.id })
    })
    console.log('metodo', deptoChoice)
    return deptoChoice;
  });
}
// add a role info to the date base
function addRole() {
  //the function back a array with all the departments name
  helperArray();
  inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'What is your rol name?',
      validate: name => {           //validation the entry
        if (name) {
          return true;
        } else {
          console.log('\n Please enter a title rol!');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'salary',
      message: 'What is the salary rol?',
      validate: salaryInput => {           //validation the entry
        if (salaryInput) {
          return true;
        } else {
          console.log('\n Please enter a salary rol!');
          return false;
        }
      }
    },
    {
      type: 'list',
      name: 'dptoId',
      message: 'Select the department for that rol?',
      choices: deptoChoice

    }
  ])
    .then(anserw => {
      let title = anserw.title;
      let salary = anserw.salary;
      let id = anserw.dptoId;
      console.log('ID', id)


      //query insert a role
      connection.query('INSERT INTO role SET title=?,salary=?,department_id=? ', [title, salary, id], (err, res) => {
        if (err) throw err;
        console.log(res.affectedRows + ' role inserted!\n');
        menu();
      })
    })
}




function helperEmployee() {
 connection.query(`SELECT role.title,role.id FROM role `, (err, res) => {

      if (err) throw err;     
      res.forEach(roles => {
        roleChoice.push({name:roles.title,value:roles.id})
      })
      console.log('titulo y id',roleChoice)
      return roleChoice;
  });
}

//add a employe to the date base
function addEmployee() {
  helperEmployee();
  inquirer.prompt([

      {
          type: 'input',
          name: 'name',
          message: 'What is the employee\manager name?',
          validate: name => {           //validation the entry
              if (name) {
                  return true;
              } else {
                  console.log('\n Please enter the name!');
                  return false;
              }
          }
      },
      {
          type: 'input',
          name: 'lastName',
          message: 'What is the employee\ manager last name?',
          validate: lastnameInput => {           //validation the entry
              if (lastnameInput) {
                  return true;
              } else {
                  console.log('\n Please enter the last name!');
                  return false;
              }
          }
      },
      {
          type: 'list',
          name: 'selectRole',
          message: 'Select a role for a employee',
          choices: roleChoice
      },
      {
          type: 'input',
          name: 'magId',
          message: 'What is the manager id?'

      }
  ])
      .then(anserw => {
          //taking the value entry for the prompt
          let name = anserw.name;
          let last = anserw.lastName;
          let roleIdEmp = anserw.selectRole;
          //manager id can be null to
          let managerId = anserw.magId || null;

          //sql consult insert  a employee
          connection.query('INSERT INTO employee SET first_name=?,last_name=?,role_id=?,manager_id=? ', [name, last, roleIdEmp, managerId], (err, res) => {
              if (err) throw err;
              console.log(res.affectedRows + ' employee inserted!\n');
          })
      })
}