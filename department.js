const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('./db/database');




class Department {
    constructor() {

    }

    showDepartments() {
        db.query(`SELECT * FROM department`, (err, res) => {
            if (err) throw err;
    
            if (res.length > 0) {
               
                console.table(res);
            }    
        });    
    }

    addDepartment() {
        inquirer.prompt([
            //manager name
            {
                type: 'input',
                name: 'nameDpto',
                message: 'What is your deparment name?',
                validate: name => {           //validation the entry
                    if (name) {
                        return true;
                    } else {
                        console.log('\n Please enter team manager’s name!');
                        return false;
                    }
                }
            }
        ])
            .then(anserw => {
                let nameDepartment = anserw.nameDpto;
                db.query('INSERT INTO department SET name=? ', [nameDepartment], (err, res) => {
                    if (err) throw err;
                   /* if (res.afectedRows > 0) {
                        console.log("succesfully insert")
                    }*/
                    console.log(res.affectedRows + ' department inserted!\n');
                })
            })
    }



    
}

module.exports = new Department();