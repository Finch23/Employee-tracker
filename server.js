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

    case 'View all roles':
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
connection.query('select * from department', (err, res) => {
  if (err) throw err;
  inquirer
    .prompt([
      {
      name: 'title',
      type: 'input',
      message: 'What Role would you like to add?'
      },
      {
      name: 'salary',
      type: 'number',
      message: "What is this Role's yearly salary"
      },
      {
        name: 'department',
        type: 'list',
        message: "What is the department?",
        choices: () => {
          var arr = [];
          for (var i = 0; i < res.length; i ++) {
            arr.push(res[i].name);
          }
          return arr;
        }
      }
    ])
    .then(function(answer) {
      let chosenDep;

      for (let i = 0; i < res.length; i++) {
        if (res[i].name === answer.department) {
          chosenDep = res[i]
        }
      }
      
      const query = connection.query(
        'insert into roles set ?', {
          title: answer.title,
          salary: answer.salary,
          dep_id: chosenDep.id
        },
        (err, result) => {
          if (err) throw err;
          console.log('Added Role!!');
          console.table(result);
          runSearch();
        }
      )
    })
  })
}

function addEmployee() {
  connection.query('select * from roles', (err, res) => {
    if(err) throw err;

    inquirer
    .prompt([{
        name: 'first_name',
        type: 'input',
        message: "What is the employee's first name?"
      },
      {
        name: 'last_name',
        type: 'input',
        message: "What is the employee's last name?"
      },
      {
        name: 'role',
        type: 'list',
        message: "What is the employee's role?",
        choices: () => {
          const arr = [];

          for (let i = 0; i < res.length; i++) {
            arr.push(res[i].title)
          }
          return arr; 
        }
      }
    ]).then(function(answers) {
      let role;

      for (let i = 0; i < res.length; i++) {
        if (res[i].role === answers.role) {
          role = res[i]
        }
      }

      const query = connection.query(
        'insert into employee set ?', {
          first_name: answers.first_name,
          last_name: answers.last_name,
          role_id: role.id
        },
        (err, results) => {
          if (err) throw err;
          console.table(results);
          console.log('Employee Added')
        }
      )
      runSearch();
    })
  })
}

function updateEmployee() {
  connection.query('select * from employee', (err, res) => {
  inquirer
    .prompt([{
      name: 'employee',
      type: 'list',
      message: 'Choose an Employee',
      choices: () => {
        const arr = [];
        for (let i = 0; i < res.length; i++) {
          arr.push(res[i].first_name && res[i].last_name)
        }
        return arr; 
      }
    }]).then(function(data) {
      let chosenEmp;
      for (let i = 0; i < res.length; i++) {
        if (res[i].first_name && res[i].last_name === data.employee) {
          chosenEmp = res[i];
        }
      }
      connection.query('select * from roles', (err ,res) => {
        if (err) throw err; 
        
        inquirer
        .prompt([{
          name: 'role',
          type: 'list',
          message: "What is the Employee's new role?",
          choices: () => {
            const arr = [];
            for (let i = 0; i < res.length; i++) {
              arr.push(res[i].title) 
            }
            return arr;
          }
        }]).then(function(data) {
          let role;
          for (let i = 0; i < res.length; i++) {
            if( res[i].title === data.role) {
              role = res[i];
            }
          }
          
          const query = connection.query('update employee set ? where ?', 
          [
            {
            role_id: role.id
            },
            {
            employee_id: chosenEmp.id
            }
          ], (err) => {
            if (err) throw err;
            console.log('Updated Employee');
            runSearch();
          })
        })
      })
    })
  })
}
  

