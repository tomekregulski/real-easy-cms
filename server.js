// dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");
const taskQuestions = require("./taskQuestion");
const viewDb = require("./viewDb");
const console_table = require("console.table");

// mysql password
// change file path to './config' once you've added your mysql password to the config file. See README
const pass = require("./config");

// connection to db
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: pass,
  database: "cms",
});

function init() {
  inquirer.prompt(taskQuestions).then((data) => {
    console.log(data.task);
    if (data.task === "View Database") {
      console.log(data.task);
      view();
    } else if (data.task === "Create Entry") {
      console.log(data.task);
      create();
    } else if (data.task === "Update Entry") {
      update();
    } else if (data.task === "Update Entry") {
      remove();
    }
  });
}

const view = () => {
  inquirer.prompt(viewDb).then((data) => {
    console.log(data.db);
    if (data.db === "Departments") {
      console.log(data.db);
      getDept();
    } else if (data.db === "Roles") {
      console.log(data.db);
      getRoles();
    } else if (data.db === "Employees") {
      getEmployees();
    }
  });
};

const getDept = () => {
  console.log("getting department");
  connection.query("SELECT * FROM departments", (err, res) => {
    if (err) throw err;
    console.log(res);
  });
  connection.end();
};

const getRoles = () => {
  connection.query("SELECT * FROM roles", (err, res) => {
    if (err) throw err;
    console.log(res);
  });
  connection.end();
};

const getEmployees = () => {
  connection.query("SELECT * FROM employees", (err, res) => {
    if (err) throw err;
    console.log(res);
  });
  connection.end();
};

const create = () => {
  // collect database name and pull up the appropriate follow-up questions
  // collect the rest of the information needed to create the entry
  // check that name is not a duplicate
  // put through the sql command to create the entry.
  // call select * from the target database to display the updated list.
};

const update = () => {
  // collect ID of employee to update
  // ask if updating role or manager
  // enter new role or manager for employee
  // put through the sql command to update the entry accordingly.
  // call select * from the target database to display the updated list.
};

const remove = () => {
  // collect database name
  // collect ID of entry to remove
  // put through the sql command to remove the entry.
  // call select * from the target database to display the updated list.
};

const budget = () => {
  // collect department name
  // put through the sql command to get the sum total of salaries in that department
  // call select * from the target department to display the itemized list.
};

init();

// app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
