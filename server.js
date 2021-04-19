// dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");
const taskQuestions = require("./taskQuestion");
const viewDb = require("./viewDb");
const console_table = require("console.table");
const updateEmployeeRole = require("./updateEmployeeRole");
const updateEmployeeMgr = require("./updateEmployeeMgr");
const updateMenu = require("./updateMenu");

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
    } else if (data.task === "Remove Entry") {
      remove();
    } else if (data.task === "View Department Budget") {
      budget();
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
  inquirer.prompt(updateMenu).then((data) => {
    console.log(data.update);
    if (data.update === "Role") {
      console.log(data.update);
      updateRole();
    } else if (data.update === "Manager") {
      console.log(data.update);
      updateMgr();
    }
  });
};

const updateRole = () => {
  inquirer.prompt(updateEmployeeRole).then((data) => {
    console.log(data);
    const empId = parseInt(data.id);
    const empRole = parseInt(data.role);
    console.log("Checking the system...\n");
    connection.query(
      "UPDATE employees SET ? WHERE ?",
      [
        {
          role_id: empRole,
        },
        {
          id: empId,
        },
      ],
      (err, res) => {
        if (err) throw err;
        console.log("Employee role has been updated.");
        console.log(res);
      }
    );
    connection.end();
  });
};

const updateMgr = () => {
  inquirer.prompt(updateEmployeeMgr).then((data) => {
    console.log(data);
    console.log("Updating employee manager...\n");
    // const query = connection.query(
    //   "UPDATE employees SET ? WHERE ?",
    //   [
    //     {
    //       manager: `${updateMgr.mgr}`,
    //     },
    //     {
    //       id: `${updateMgr.id}`,
    //     },
    //   ],
    //   (err, res) => {
    //     if (err) throw err;
    //     console.log(`${res.affectedRows} updated!\n`);
    //   }
    // );
    // console.log(query.sql);
  });
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
