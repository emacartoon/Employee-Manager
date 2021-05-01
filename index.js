const mysql = require("mysql");
const inquirer = require("inquirer");
const util = require("util");
const { POINT_CONVERSION_COMPRESSED } = require("constants");
const cTable = require("console.table");

const connection = mysql.createConnection({
  host: "localhost",
  // Your username
  user: "root",
  // Your password
  password: "",
  database: "emp_trackDB",
});

connection.connect();

// Setting up connection.query to use promises instead of callbacks
// This allows us to use the async/await syntax
connection.query = util.promisify(connection.query);

module.exports = connection;

console.log(` _____                 _                         __   __                                   
| ____|_ __ ___  _ __ | | ___  _   _  ___  ___  |   V   | __ _ _ __   __ _  __ _  ___ _ __ 
|  _| | '_ ' _  | '_ '| |/ _ '| | | |/ _ |/ _ | | | v | |/ _' | '_  |/ _' |/ _' |/ _ | '__|
| |___| | | | | | |_) | | (_) | |_| |  __/  __/ | |   | | (_| | | | | (_| | (_| |  __/ |   
|_____|_| |_| |_| .__/|_| ___/'.__, | ___| ___| |_|   |_| __,_|_| |_| __,_| __, | ___|_|   
                |_|            |___/                                       |___/           `);

// Inquiry
// I want to:
// View All Employees
// View Employees by Manager
// View Employees by Department
// Add Employee
// Remove Employee
// Update Employee Role
// Update Employee Manager
// Update Employee Salary
// View Departments
// Add Department
// Remove Department
// View All Roles
// Add Role
// Remove Role
// View Total Utilized Budget by Department

function pickToDo() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "actionChoice",
        message: "I want to:",
        choices: [
          "View All Employees",
          "View Departments",
          "View All Roles",
          "Add Employee",
          "Update Employee Role",
          "Add Department",
          "Add Role",
          "Exit",
        ],
      },
    ])
    .then(function (answer) {
      switch (answer.actionChoice) {
        case "View All Employees":
          viewAllEmployees();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Update Employee Role":
          updateEmployeeRole();
          break;
        case "View Departments":
          viewDepartments();
          break;
        case "Add Department":
          addDepartment();
          break;
        case "View All Roles":
          viewAllRoles();
          break;
        case "Add Role":
          addRole();
          break;
        case "Exit":
          connection.end();
      }
    });
}

// Start Program
pickToDo();


// Function to call data

function viewAllEmployees() {
  connection.query("SELECT * FROM employees", function (err, data) {
    console.log(data);
    console.table(data);
    pickToDo();
  });
}

// async viewEmployeesByManager(){
// };

// function viewEmployeesByDepartment() {
// };

async function addEmployee() {
  const departments = await connection.query("SELECT * FROM departments");
  const departmentChoices = departments.map(({ id, name }) => ({
    name: name,
    value: id,
  }));
  const roles = await connection.query("SELECT * FROM roles");
  const roleChoices = roles.map(({ id, title }) => ({
    name: title,
    value: id,
  }));
  const employee = await inquirer.prompt([
    {
      type: "input",
      name: "first_name",
      message: "First name: ",
    },
    {
      type: "input",
      name: "last_name",
      message: "Last name: ",
    },
    {
      type: "list",
      name: "department_id",
      message: "Which department? ",
      choices: departmentChoices,
    },
    {
      type: "list",
      name: "role_id",
      message: "What is their role? ",
      choices: roleChoices,
    },
  ]);
  const result = await connection.query("INSERT INTO employees SET ?", employee);
  console.table(result);
  pickToDo();
}

// async removeEmployee(){
// };

async function updateEmployeeRole() {
  const employees = await connection.query("SELECT * FROM employees");
  const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
    name: first_name + " " + last_name,
    value: id,
  }));
  const roles = await connection.query("SELECT * FROM roles");
  const roleChoices = roles.map(({ id, title }) => ({
    name: title,
    value: id,
  }));
  const employee = await inquirer.prompt([
    {
      type: "list",
      name: "id",
      message: "Employee to update: ",
      choices: employeeChoices,
    },
    {
      type: "list",
      name: "role_id",
      message: "New role? ",
      choices: roleChoices,
    },
  ]);
  console.log(employeeChoices, roleChoices);
  console.log(employee);
  const result = await connection.query(
    "UPDATE employees SET role_id = ? WHERE id = ?",
    [employee.role_id, employee.id]
  );

  console.table(result);
  pickToDo();
}

// async updateEmployeeManager(){
// };

// async updateEmployeeSalary(){
// };

function viewDepartments() {
  connection.query("SELECT * FROM departments", function (err, data) {
    console.table(data);
    pickToDo();
  });
}

async function addDepartment() {
  const department = await inquirer.prompt({
    type: "input",
    name: "dept_name",
    message: "Department to add?",
  });
  const result = await connection.query(
    "INSERT INTO departments SET ?",
    department
  );
  console.table(result);
  pickToDo();
}

// async removeDepartment(){
// };

function viewAllRoles() {
  connection.query("SELECT * FROM roles", function (err, data) {
    console.table(data);
    pickToDo();
  });
}

async function addRole() {
  const departments = await connection.query("SELECT * FROM departments");
  const departmentChoices = departments.map(({ id, name }) => ({
    name: name,
    value: id,
  }));
  const role = await inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "What role to add?",
    },
    {
      type: "input",
      name: "salary",
      message: "Salary?",
    },
    {
      type: "list",
      name: "department_id",
      message: "Into which department?",
      choices: departmentChoices,
    },
  ]);
  const result = await connection.query("INSERT INTO roles SET ?", role);
  console.table(result);
  pickToDo();
}

// async removeRole(){
// };

// async viewBudget(){
// };


