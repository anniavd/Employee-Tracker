const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('./db/database');




class Department {
    constructor() {

    }
   //show all the department info in a table
    showDepartments() {
        //sql consult select
        db.query(`SELECT * FROM department`, (err, res) => {
            if (err) throw err;

            if (res.length > 0) {

                console.table(res);
            }
        });
    }

    //add a department to the datebase
    addDepartment() {
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
                db.query('INSERT INTO department SET name=? ', [nameDepartment], (err, res) => {
                    if (err) throw err;
                   
                    console.log(res.affectedRows + ' department inserted!\n');
                })
            })
    }
 //delete a departmet fron the datebase table 
    deleteApartment() {

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
                db.query('DELETE FROM department WHERE id=? ', [deleteId], (err, res) => {
                    if (err) throw err;
                    
                    console.log(res.affectedRows + ' department delete!\n');
                })
            })
    }

}

module.exports = new Department();