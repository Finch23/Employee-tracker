const inquirer = require("inquirer");
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
      viewEmployee();
      break;

    case 'View all departments':
      viewDepartment();
      break;

    case 'view all roles':
      viewRoles();
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

function viewEmployee() {
  connection.query('select * from employee', (err, res) => {
    if (err) {
      throw err;
    }
    console.table(res);
    runSearch();
  });
}

function viewDepartment() {
  connection.query('select * from department', (err, res) => {
    if (err) {
      throw err;
    }
    console.table(res);
    runSearch();
  })
}

function viewRoles() {
  connection.query('select * from roles', (err, res) => {
    if (err) {
      throw err;
    }
    console.table(res);
    runSearch();
  })
}

function addDepartment() {
inquirer
  .prompt({
    name: 'newDep',
    type: 'input',
    message: 'What department would you like to add?'
  })
  .then(function(answer) {
    var query = 'insert into department set ?';

    connection.query(query, {name: answer.newDep}, function(err, res) {
      if (err) throw err;
      console.log(`Department Added!! ${res.affectedRows}`);
      runSearch();
    });
  });
}

function addRole() {
  inquirer
    .prompt({
      name: 'newRole',
      type: 'input',
      message: 'What Role would you like to add?'
    })
    .then(function(answer) {
      var query = 'insert into roles set ?';
  
      connection.query(query, {name: answer.newRole}, function(err, res) {
        if (err) throw err;
        console.log(`Role Added! ${res.affectedRows}`)
        runSearch();
      });
    });
  }
  

