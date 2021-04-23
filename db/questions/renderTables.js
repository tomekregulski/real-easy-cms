const mysql = require("mysql");
const pass = require("../../config");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: pass,
  database: "cms",
});

let currentDepartments = [];
let renderDepartments = () => {
  connection.query("SELECT id, name FROM departments", (err, res) => {
    if (err) throw err;
    res.forEach((index) => currentDepartments.push(index.name));
  });
};

let currentRoles = [];
let renderRoles = () => {
  connection.query("SELECT id, title FROM roles", (err, res) => {
    if (err) throw err;
    res.forEach((index) => currentRoles.push(index.title));
  });
};

let currentEmployees = [];
let renderEmployees = () => {
  connection.query(
    "SELECT id, first_name, last_name FROM employees",
    (err, res) => {
      if (err) throw err;
      res.forEach((index) =>
        currentEmployees.push(
          `${index.id} - ${index.first_name} ${index.last_name}`
        )
      );
      // console.log(currentEmployees);
    }
  );
};

const viewDeptBudget = [
  {
    type: "list",
    name: "department",
    message: "Please select which department to check the budget for.",
    choices: currentDepartments,
  },
];

renderRoles();
renderEmployees();
renderDepartments();

module.exports = {
  currentEmployees,
  currentRoles,
  currentDepartments,
  viewDeptBudget,
};
