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
// let { currentRoles, currentEmployees } = require("./db/questions/testEmp");

// mysql password
// change file path to './config' once you've added your mysql password to the config file. See README
const pass = require("./config");

let currentRoles = [];
let renderRoles = () => {
  connection.query("SELECT id, title FROM roles", (err, res) => {
    if (err) throw err;
    res.forEach((index) => currentRoles.push(index.title));
    // console.log(currentRoles);
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

const updateEmpRole = [
  {
    type: "list",
    name: "selectedEmployee",
    message: "Please select a current employee.",
    choices: currentEmployees,
  },
  {
    type: "list",
    name: "newRole",
    message: "Please input the employee's new role.",
    choices: currentRoles,
  },
];

const updateEmpMgr = [
  {
    type: "list",
    name: "selectedEmployee",
    message: "Please select a current employee.",
    choices: currentEmployees,
  },
  {
    type: "list",
    name: "assignedManager",
    message: "Please input who this employee reports to.",
    choices: currentEmployees,
  },
];

const deleteRole = [
  {
    type: "list",
    name: "deleteRole",
    message: "Please select which role to delete.",
    choices: currentRoles,
  },
];

// connection to db
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: pass,
  database: "cms",
});

function init() {
  // mainMenu();
  renderRoles();
  renderEmployees();
  mainMenu();
}

const next = () => {
  inquirer.prompt(updateEmpRole);
};

const mainMenu = () => {
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
};

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
  // connection.query("SELECT * FROM roles", (err, res) => {
  connection.query(
    "SELECT * FROM roles LEFT JOIN departments on roles.department_id = departments.id",
    (err, res) => {
      if (err) throw err;
      console.table(res);
    }
  );
  init();
};

const getEmployees = () => {
  // connection.query("SELECT * FROM employees", (err, res) => {
  connection.query(
    "SELECT employees.id, first_name, last_name, title, salary, manager_id FROM employees LEFT JOIN roles on employees.role_id = roles.id LEFT JOIN departments on roles.department_id = departments.id",
    (err, res) => {
      if (err) throw err;
      console.table(res);
    }
  );
  // init();
};

// const getEmployeesByMgr = () => {
//   // connection.query("SELECT * FROM employees", (err, res) => {
//     connection.query("SELECT manager_id, employee.id, first_name, last_name, title, dept_name FROM employees LEFT JOIN roles on employees.role_id = roles.id LEFT JOIN departments on roles.department_id = departments.id ORDER BY manager_id DESC", (err, res) => {
//       if (err) throw err;
//       console.table(res);
//     }
//   );
//   init();
// };

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
        // console.table(res);
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
  console.log(currentRoles);
  console.log(currentEmployees);
  inquirer.prompt(updateMenu).then((data) => {
    if (data.update === "Role") {
      updateRole();
    } else if (data.update === "Manager") {
      updateMgr();
    }
  });
};

const updateRole = () => {
  inquirer.prompt(updateEmpRole).then(({ newRole, selectedEmployee }) => {
    connection.query(
      "UPDATE employees SET role_id = ? WHERE id = ?",
      [currentRoles.indexOf(newRole) + 1, parseInt(selectedEmployee)],
      (err, res) => {
        if (err) throw err;
        console.log(
          `Updated employee ${selectedEmployee}'s role to ${newRole}.`
        );
        init();
      }
    );
  });
};

const updateMgr = () => {
  inquirer
    .prompt(updateEmpMgr)
    .then(({ selectedEmployee, assignedManager }) => {
      // In this case we set the manager ID to the employee ID of the person who is becoming the manager
      connection.query(
        "UPDATE employees SET manager_id = ? WHERE id = ?",
        [parseInt(assignedManager), parseInt(selectedEmployee)],
        (err, res) => {
          if (err) throw err;
          console.log(
            `Updated employee ${selectedEmployee} who now reports to ${assignedManager}.`
          );
          init();
        }
      );
    });
};

// UPDATE REMOVE TO MATCH ROLE FLOW

const remove = () => {
  inquirer.prompt(removeMenu).then((data) => {
    // removeId = parseInt(data.id);
    if (data.remove === "Departments") {
      removeDepartment(removeId);
    } else if (data.remove === "Roles") {
      removeRole();
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
    }
  );
  init();
};

const removeRole = () => {
  inquirer.prompt(deleteRole).then(({ deleteRole }) => {
    connection.query(
      "DELETE FROM roles WHERE title = ?",
      [deleteRole],
      (err, res) => {
        if (err) {
          if (err) throw err;
        } else {
          console.log(
            `Deleted ${deleteRole} from the roles table. Updating accessible data...`
          );
          currentRoles.splice(currentRoles.indexOf(deleteRole), 1);
        }
        init();
      }
    );
  });
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
    }
  );
  init();
};

// UPDATE TO USE NEW VARIABLES

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
  });
};

init();
