const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('./db/database');



class Employee {
    constructor() {

    }

    showEmployees() {
        db.query(`SELECT * FROM employee`, (err, res) => {
            if (err) throw err;
    
            if (res.length > 0) {
               
                console.table(res);
            }    
        });    
    }

   addEmployee () {
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
                let name = anserw.name;
                let last=anserw.lastName;
                let roleIdEmp=anserw.roleId;
                let managerId=anserw.magId;
                db.query('INSERT INTO employee SET first_name=?,last_name=?,role_id=?,manager_id=? ',[name,last,roleIdEmp,managerId], (err, res) => {
                    if (err) throw err;                   
                    console.log(res.affectedRows + ' employee inserted!\n');
                })
            })
    }



    
}

module.exports = new Employee();