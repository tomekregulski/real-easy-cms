const mysql = require("mysql");
const pass = require("../../config");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: pass,
  database: "cms",
});

let departmentsList = [];
let buildDepartmentsList = () => {
  connection.query("SELECT id, name FROM departments", (err, res) => {
    if (err) throw err;
    res.forEach((index) => departmentsList.push(index.name));
  });
};

let rolesList = [];
let buildRolesList = () => {
  connection.query("SELECT id, title FROM roles", (err, res) => {
    if (err) throw err;
    res.forEach((index) => rolesList.push(index.title));
  });
};

let employeesList = [];
let buildEmployeesList = () => {
  connection.query(
    "SELECT id, first_name, last_name FROM employees",
    (err, res) => {
      if (err) throw err;
      res.forEach((index) =>
        employeesList.push(
          `${index.id} - ${index.first_name} ${index.last_name}`
        )
      );
    }
  );
};

const viewDeptBudget = [
  {
    type: "list",
    name: "department",
    message: "Please select which department to check the budget for.",
    choices: departmentsList,
  },
];

buildRolesList();
buildEmployeesList();
buildDepartmentsList();

module.exports = {
  employeesList,
  rolesList,
  departmentsList,
  viewDeptBudget,
};
