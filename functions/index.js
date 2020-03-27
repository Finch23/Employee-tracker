const connection = require('../server');
const cTable = require('console.table')

var myFuncs = {
    viewEmployee: function() {
        connection.query('select * from employee', (err, res) => {
            if (err) throw err;
            cTable(res);
        });
    },
    viewDepartment: function() {
        connection.query('select * from department', (err, res) => {
            if (err) throw err;
            cTable(res);
        });
    },
    viewRoles: function() {
        connection.query('select * from role', (err, res) => {
            if (err) throw err;
            cTable(res);
        });
    },
}

module.exports = myFuncs; 