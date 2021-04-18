// dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");
const questions = require("./questions");

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
  inquirer.prompt(questions).then((data) => {
    console.log(data.test);
    if (data.test === "Dept") {
      console.log(data.test);
      getDept();
    } else if (data.test === "Roles") {
      console.log(data.test);
      getRoles();
    } else if (data.test === "Employees") {
      getEmployees();
    }
  });
}

const getDept = () => {
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

init();

// app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
