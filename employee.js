const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('./db/database');
const { query } = require('./db/database');
const role = require('./role');



class Employee {
    constructor() {

    }
    //show employee info in a table
    showEmployees() {
        //sql consult select
        db.query(`SELECT employee.id, employee.first_name,employee.last_name,role.title AS job_title,role.salary,
         CONCAT(manager.first_name ," ", manager.last_name) AS Manager FROM  employee LEFT JOIN role ON employee.role_id=role.id LEFT JOIN employee  manager ON manager.id = employee.manager_id`, (err, res) => {
            console.log(res); 
           
            if (err) throw err;
    
            if (res.length > 0) {
               
                console.table(res);
            }   
            
        });    
        
    }
  //add a employe to the date base
   addEmployee () {
    //  db.query(select role.title from role,(req,res))
    //  let array=[];//
//array=res
        inquirer.prompt([
            
            {
                type: 'input',
                name: 'name',
                message: 'What is the employee name?',
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
                message: 'What is the employee last name?',
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
            type: 'input',
            name: 'roleId',
            message: 'What is the role id?',
           // choices:array
            validate: roleIdinput => {           //validation the entry
                if (roleIdinput ) {
                    return true;
                } else {
                    console.log('\n Please enter a role id!');
                    return false;
                }
            }
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
                let last=anserw.lastName;
                let roleIdEmp=anserw.roleId;
                //manager id can be null to
                let managerId=anserw.magId || null;

                //sql consult insert  a employee
                db.query('INSERT INTO employee SET first_name=?,last_name=?,role_id=?,manager_id=? ',[name,last,roleIdEmp,managerId], (err, res) => {
                    if (err) throw err;                   
                    console.log(res.affectedRows + ' employee inserted!\n');
                })
            })
    }

    //delete a employee info from a table used a id
    deleteEmployee() {

        inquirer.prompt([
    
            {
                type: 'input',
                name: 'empId',
                message: 'What is the employee id ?',
                validate: idInput => {           //validation the entry
                    if (idInput) {
                        return true;
                    } else {
                        console.log('\n Please enter a employee id!');
                        return false;
                    }
                }
            }
        ])
            .then(anserw => {
                let deleteId = anserw.empId;
                //sql consult delete employee
                db.query('DELETE FROM employee WHERE id=? ', [deleteId], (err, res) => {
                    if (err) throw err;
                    
                    console.log(res.affectedRows + ' employee delete!\n');
                })
            })
    }
     



    
}

module.exports = new Employee();