const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('./db/database');


class Role {
    constructor() {

    }

    showRoles() {
        db.query(`SELECT * FROM role`, (err, res) => {
            if (err) throw err;
    
            if (res.length > 0) {
               
                console.table(res);
            }    
        });    
    }

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
                db.query('INSERT INTO role SET title=?,salary=?,department_id=? ', [title,salary,id], (err, res) => {
                    if (err) throw err;                   
                    console.log(res.affectedRows + ' role inserted!\n');
                })
            })
    }



    
}

module.exports = new Role();