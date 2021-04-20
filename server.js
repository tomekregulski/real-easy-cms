// dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");
const taskQuestions = require("./db/questions/taskQuestion");
const viewDb = require("./db/questions/viewDb");
const console_table = require("console.table");
const updateEmployeeRole = require("./db/questions/updateEmployeeRole");
const updateEmployeeMgr = require("./db/questions/updateEmployeeMgr");
const updateMenu = require("./db/questions/updateMenu");
const createDeptQues = require("./db/questions/createDept");
const createRoleQues = require("./db/questions/createRole");
const createEmployeeQues = require("./db/questions/createEmployee");
const createMenu = require("./db/questions/createMenu");
const removeMenu = require("./db/questions/removeMenu");
const budgetQues = require("./db/questions/budget");

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
    } else {
      connection.end();
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
    console.table(res);
  });
  init();
};

const getRoles = () => {
  connection.query("SELECT * FROM roles", (err, res) => {
    if (err) throw err;
    console.table(res);
  });
  init();
};

const getEmployees = () => {
  connection.query("SELECT * FROM employees", (err, res) => {
    if (err) throw err;
    console.table(res);
  });
  init();
};

const create = () => {
  inquirer.prompt(createMenu).then((data) => {
    console.log(data);
    if (data.create === "Department") {
      createDepartment();
    } else if (data.create === "Role") {
      createRole();
    } else if (data.create === "Employee") {
      createEmployee();
    }
  });
};

const createDepartment = () => {
  console.log("Creating department...");
  inquirer.prompt(createDeptQues).then((data) => {
    console.log(data);
    connection.query(
      "INSERT INTO departments SET ?",
      {
        name: data.name,
      },
      (err) => {
        if (err) throw err;
        console.log("The department was created successfully!");
        console.table(res);
      }
    );
    init();
  });
};

const createRole = () => {
  console.log("Creating role...");
  inquirer.prompt(createRoleQues).then((data) => {
    roleTitle = data.roleTitle;
    roleSalary = parseInt(data.roleSalary);
    roleDept = parseInt(data.roleDept);
    connection.query(
      "INSERT INTO roles SET ?",
      {
        title: roleTitle,
        salary: roleSalary,
        department_id: roleDept,
      },
      (err) => {
        if (err) throw err;
        console.log("The role was created successfully!");
        console.table(res);
      }
    );
    init();
  });
};

const createEmployee = () => {
  console.log("Creating employee...");
  inquirer.prompt(createEmployeeQues).then((data) => {
    roleId = parseInt(data.roleId);
    mgrId = parseInt(data.mgrId);
    connection.query(
      "INSERT INTO employees SET ?",
      {
        first_name: data.firstName,
        last_name: data.lastName,
        role_id: roleId,
        manager_id: mgrId,
      },
      (err) => {
        if (err) throw err;
        console.log("The role was created successfully!");
        console.table(res);
      }
    );
    init();
  });
};

const update = () => {
  inquirer.prompt(updateMenu).then((data) => {
    if (data.update === "Role") {
      updateRole();
    } else if (data.update === "Manager") {
      updateMgr();
    }
  });
};

const updateRole = () => {
  inquirer.prompt(updateEmployeeRole).then((data) => {
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
        console.table(res);
      }
    );
    init();
  });
};

const updateMgr = () => {
  inquirer.prompt(updateEmployeeMgr).then((data) => {
    const empId = parseInt(data.id);
    const mgrId = parseInt(data.mgrId);
    console.log("Checking the system...");
    connection.query(
      "UPDATE employees SET ? WHERE ?",
      [
        {
          manager_id: mgrId,
        },
        {
          id: empId,
        },
      ],
      (err, res) => {
        if (err) throw err;
        console.log("Employee manager has been updated.");
        console.table(res);
      }
    );
    init();
  });
};

const remove = () => {
  inquirer.prompt(removeMenu).then((data) => {
    removeId = parseInt(data.id);
    if (data.remove === "Departments") {
      removeDepartment(removeId);
    } else if (data.remove === "Roles") {
      removeRole(removeId);
    } else if (data.remove === "Employees") {
      console.log("calling remove employee");
      removeEmployee(removeId);
    }
  });
};

const removeDepartment = (removeId) => {
  connection.query(
    "DELETE FROM departments WHERE ?",
    {
      id: removeId,
    },
    (err, res) => {
      if (err) throw err;
      console.log("Department successfully removed.");
      console.table(res);
    }
  );
  init();
};

const removeRole = (removeId) => {
  connection.query(
    "DELETE FROM roles WHERE ?",
    {
      id: removeId,
    },
    (err, res) => {
      if (err) throw err;
      console.log("Role successfully removed.");
      console.table(res);
    }
  );
  init();
};

const removeEmployee = (removeId) => {
  connection.query(
    "DELETE FROM employees WHERE ?",
    {
      id: removeId,
    },
    (err, res) => {
      if (err) throw err;
      console.log("Employee successfully removed.");
      console.table(res);
    }
  );
  init();
};

const budget = () => {
  inquirer.prompt(budgetQues).then((data) => {
    dept = data.id;
    connection.query(
      "SELECT employees.first_name, employees.last_name, roles.salary, roles.department_id FROM employees Inner Join roles ON roles.id = employees.role_id WHERE ?",
      {
        department_id: dept,
      },
      (err, res) => {
        if (err) throw err;
        console.log("Employee successfully removed.");
        console.table(res);
      }
    );
    init();
    // collect department name
    // put through the sql command to get the sum total of salaries in that department
    // call select * from the target department to display the itemized list.
  });
};

init();
