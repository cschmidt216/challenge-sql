const inquirer = require('inquirer');
const dbConnect = require("./config/connection")

function dbSearch() {
  inquirer.prompt([
    {
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a new department",
        "Add a new role",
        "Add a new employee",
        "Update employee roles",
      ]
    }])
    .then(function (answer) {
      switch (answer.action) {
        case "View all departments":
          viewDepartments();
          break;
        case "View all roles":
          viewRoles();
          break;
        case "View all employees":
          viewEmployees();
          break;
        case "Add a new department":
          addDepartment();
          break;
        case "Add a new role":
          addRole();
          break;
        case "Add a new employee":
          addEmployee();
          break;
        case "Update employee roles":
          updateEmpRole();
          break;
      }
    });
};

function addDepartment() {
  inquirer.prompt([
    {
      name: 'addDepartment',
      message: 'Name of Department to be added:'
    }
  ]).then(function (answer) {
    dbConnect.query('INSERT INTO department SET ?', {
      department_name: answer.addDepartment
    }, function (err, res) {
      if (err) throw err;
      console.table(res)
      dbSearch()
    })
  }
  )
}
const addRole = () => {
  dbConnect.query('SELECT * FROM department', (err, department) => {
    if (err) { console.log(err) }
    inquirer.prompt([
      {
        type: 'input',
        name: 'title',
        message: 'Name of role to be added:'
      },
      {
        type: 'number',
        name: 'salary',
        message: 'Salary for role:'
      },
      {
        type: 'list',
        name: 'department_id',
        message: 'Department ID:',
        choices: department.map(department => ({
          name: `${department.department_name}`,
          value: department.id
        }))
      }
    ]).then(function (answers) {
      dbConnect.query('INSERT INTO role SET ?', {
        title: answers.title,
        salary: answers.salary,
        department_id: answers.department_id
      }, function (err, res) {
        if (err) throw err;
        console.table(res)
        dbSearch()
      })
    })
  })
}
const addEmployee = () => {
  dbConnect.query('SELECT * FROM role', (err, role) => {
    if (err) { console.log(err) }
    inquirer.prompt([
      {
        type: 'input',
        name: 'first_name',
        message: 'First Name:'
      },
      {
        type: 'input',
        name: 'last_name',
        message: 'Last Name:'
      },
      {
        type: 'list',
        name: 'role_id',
        message: 'Role ID:',
        choices: role.map(role => ({
          name: `${role.title}`,
          value: role.id
        }))
      }
    ]).then(function (answers) {
      dbConnect.query('INSERT INTO employee SET ?', {
        first_name: answers.first_name,
        last_name: answers.last_name,
        role_id: answers.role_id,
        manager_id: null
      }, function (err, res) {
        if (err) throw err;
        console.table(res)
        dbSearch()
      })
    })
  })
}
function viewDepartments() {
  dbConnect.query('SELECT * FROM department', function (err, res) {
    if (err) throw err;
    console.table(res)
    dbSearch()
  })
}
function viewRoles() {
  dbConnect.query('SELECT * FROM role', function (err, res) {
    if (err) throw err;
    console.table(res)
    dbSearch()
  })
}
function viewEmployees() {
  dbConnect.query('SELECT * FROM employee', function (err, res) {
    if (err) throw err;
    console.table(res)
    dbSearch()
  })
}
function updateEmpRole() {

  dbConnect.query('SELECT * FROM employee', (err, employee) => {
    if (err) { console.log(err) }
    dbConnect.query(`SELECT * FROM role`, (err, role) => {
      if (err) { console.log(err) }
      inquirer.prompt([
        {
          type: "list",
          name: "select",
          message: "Select the employee whose role will be updated",
          choices: employee.map(employee => ({
            name: `${employee.first_name} ${employee.last_name} - Role ID:${employee.role_id}`,
            value: employee.id
          }))
        },
        {
          type: 'list',
          name: 'updatedRole',
          message: 'New Role ID:',
          choices: role.map(role => ({
            name: `${role.title}`,
            value: role.id
          }))
        }
      ]).then(function (answers) {
        dbConnect.query('UPDATE employee SET ? WHERE ?', [{ role_id: answers.updatedRole }, { id: answers.select }], function (err, res) {
          if (err) throw err
          console.log('Employee role updated.')
          dbSearch()
        })
      })
    })
  })
}
dbSearch();