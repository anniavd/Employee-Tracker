const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
//arrays for show the info on the prompt for select choices
let deptoChoice = [];
let roleChoice = [];
let employeName = [];




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



// show the questions 
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
        updateEmployeeRole();
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
      console.log(' ** Departments **')
      console.log('\n')
      console.table(res);
    }
    //call the menu for show a question again
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
        console.log(' ** Roles **')
        console.log('\n')
        console.table(res);
      }
      //call the menu for show a question again
      menu();
    });
}
// show all the employee info
function showEmployees() {
  //query consult select
  connection.query(`SELECT employee.id, employee.first_name,employee.last_name,role.title AS job_title,role.salary,
       CONCAT(manager.first_name ," ", manager.last_name) AS Manager FROM  employee LEFT JOIN role ON employee.role_id=role.id LEFT JOIN employee  manager ON manager.id = employee.manager_id`, (err, res) => {
    // console.log(res);

    if (err) throw err;

    if (res.length > 0) {
      console.log('\n')
      console.log('** Employees **')
      console.log('\n')
      console.table(res);
    }
    //call the menu for show a question again
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

        //print the info tell the user 1 department was inserted
        console.log(res.affectedRows + ' department inserted!\n');

        //call the menu for show a question again
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

//select all from department table and back a object array (department name and id)
function helperArray() {
  connection.query(`SELECT * FROM department `, (err, res) => {

    if (err) throw err;
    res.forEach(dpto => {
     //save on the list a object
      deptoChoice.push({ name: dpto.name, value: dpto.id })
    })
   // console.log('metodo', deptoChoice)
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

//select title and  id from role table and back a object array
function helperEmployee() {
  connection.query(`SELECT role.title,role.id FROM role `, (err, res) => {

    if (err) throw err;
    res.forEach(roles => {
      //save on the list a object
      roleChoice.push({ name: roles.title, value: roles.id })
    })
   // console.log('titulo y id', roleChoice)
    return roleChoice;
  });
}

//select first name, las name  and  id from employee table and back a object array
function helperEmpManager() {
  connection.query(`SELECT  CONCAT(employee.first_name," " ,employee.last_name) AS fullName, employee.id FROM employee`, (err, res) => {
    
    if (err) throw err;
    res.forEach(emp => {
      //save on the list a object
      employeName.push({ name:emp.fullName, value:emp.id})
    })
   // console.log('employee names', employeName)
    return employeName;
  });
}

//add a employe to the date base
function addEmployee() {
  helperEmployee();
  helperEmpManager();
  inquirer.prompt([

    {
      type: 'input',
      name: 'name',
      message: 'What is the employee\ manager name?',
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
    // Table of Contents
    {
      type: 'confirm',
      name: 'confirmManager',
      message: 'Have a manager?',
      default: false,
    },

    {
      type: 'list',
      name: 'magId',
      message: 'Have a manager?',
      choices: employeName,
     when: ({ confirmManager }) => confirmManager
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
        menu();
      })
    })
}

//update employee role
 function updateEmployeeRole(){
   //call the functions back a employee names,id and roles names,id
  helperEmployee();  
  helperEmpManager();
  
  inquirer.prompt([

    {   //show a list with array employee names   
        type: 'list',
        name: 'employeeName',
        message: 'Select a employee for update name',
        choices: employeName  
       
    },
    { //show a list with the roles names
      type: 'list',
      name: 'selectRole',
      message: 'Select a new role for a employee',
      choices: roleChoice
    }

  ])
    .then(anserw => {
      let empName= anserw.employeeName;
      let newrole=anserw.selectRole;
      //query consult update role for a employee
      connection.query('UPDATE employee SET employee.role_id= ? WHERE employee.id=?', [ newrole,empName], (err, res) => {
        if (err) throw err;

        
        console.log(res.affectedRows + ' employee updated role changed!\n');

        //call the menu for show a question again
        menu();
      })
    })

};

