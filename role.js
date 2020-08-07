const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('./db/database');


class Role {
    constructor() {

    }
   // show all the role info in a table
    showRoles() {
        //sql consult select
        db.query(`SELECT role.title AS job_title,role.id,department.name AS department_name,role.salary  FROM  role LEFT JOIN department ON role.department_id=department.id`,
         (err, res) => {

                if (err) throw err;
    
            if (res.length > 0) {
               
                console.table(res);
            }    
        });    
    }

    // add a role info to the date base
    addRole() {
        inquirer.prompt([
           
            {
                type: 'input',
                name: 'title',
                message: 'What is your title rol?',
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
            type: 'input',
            name: 'dptoId',
            message: 'What is the deparment id?',
            validate: dptoIdinput => {           //validation the entry
                if (dptoIdinput ) {
                    return true;
                } else {
                    console.log('\n Please enter deparment id!');
                    return false;
                }
            }
        }
        ])
            .then(anserw => {
                let title = anserw.title;
                let salary=anserw.salary;
                let id=anserw.dptoId;

                //sql consult insert a role
                db.query('INSERT INTO role SET title=?,salary=?,department_id=? ', [title,salary,id], (err, res) => {
                    if (err) throw err;                   
                    console.log(res.affectedRows + ' role inserted!\n');
                })
            })
    }

    // delete a role from the table 
    deleteRole() {
    inquirer.prompt([

        {
            type: 'input',
            name: 'roleId',
            message: 'What is the role id ?',
            validate: idInput => {           //validation the entry
                if (idInput) {
                    return true;
                } else {
                    console.log('\n Please enter a role id!');
                    return false;
                }
            }
        }
    ])
        .then(anserw => {
            let deleteId = anserw.roleId;
            //sql consult delete 
            db.query('DELETE FROM role WHERE id=? ', [deleteId], (err, res) => {
                if (err) throw err;
                
                console.log(res.affectedRows + ' role delete!\n');
            })
        })
}



    
}

module.exports = new Role();