const inquirer = require("inquirer");
const myFuncs = require('./functions/index');
const mysql = require("mysql");

var connection = mysql.createConnection({
host: "localhost",

// Your port; if not 3306
port: 3306,

// Your username
user: "root",

// Your password
password: "12345",
database: "employeedb"
});
  

connection.connect(function(err) {
    if (err) throw err;
    console.log(`Server connected as id ${connection.threadId}`)
});

runSearch();

function runSearch() {
inquirer
  .prompt({
    name: "action",
    type: "list",
    message: "What would you like to do?",
    choices: [
      'View all employees',
      'View all departments',
      'View all roles',
      'Add a department',
      'Add a role',
      'Add an employee',
      'Update employee role',
      "exit"
    ]
  })
  .then(function(answer) {
    switch (answer.action) {
    case 'View all employees':
      myFuncs.viewEmployee();
      break;

    case 'View all departments':
      myFuncs.viewDepartment();
      break;

    case 'view all roles':
      myFuncs.viewRoles();
      break;

    case 'Add a department':
      addDepartment();
      break;
    
    case 'Add a role':
      addRole();
      break;

    case 'Add an employee':
      addEmployee();
      break;

    case 'Update employee role':
      updateEmployee();
      break;

    case "exit":
      connection.end();
      break;
    }
  });
}

module.exports = connection;