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

let currentDepartments = [];
let renderDepartments = () => {
  connection.query("SELECT id, name FROM departments", (err, res) => {
    if (err) throw err;
    res.forEach((index) => currentDepartments.push(index.name));
  });
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

const deleteDepartment = [
  {
    type: "list",
    name: "deleteDepartment",
    message: "Please select which department to delete.",
    choices: currentDepartments,
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

const viewDepartmentBudget = [
  {
    type: "list",
    name: "department",
    message: "Please select which department to check the budget for.",
    choices: currentDepartments,
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
  renderDepartments();
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
      deptBudget();
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
  connection.query(
    "SELECT employees.id, first_name, last_name, title, salary, manager_id FROM employees LEFT JOIN roles on employees.role_id = roles.id LEFT JOIN departments on roles.department_id = departments.id",
    (err, res) => {
      if (err) throw err;
      console.table(res);
    }
  );
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
      // removeDepartment(removeId);
      deleteDepartmentQuery();
    } else if (data.remove === "Roles") {
      removeRole();
    } else if (data.remove === "Employees") {
      console.log("calling remove employee");
      removeEmployee(removeId);
    }
  });
};

const deleteDepartmentQuery = () => {
  inquirer.prompt(deleteDepartment).then(({ deleteDepartment }) => {
    connection.query(
      "DELETE FROM departments WHERE name = ?",
      [deleteDepartment],
      (err, res) => {
        if (err) {
          if (err) throw err;
        } else {
          console.log(
            `Deleted ${deleteDepartment} from the departments table. Updating accessible data...`
          );
          currentDepartments.splice(
            currentDepartments.indexOf(deleteDepartment),
            1
          );
        }
      }
    );
    init();
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

const deptBudget = () => {
  inquirer.prompt(viewDepartmentBudget).then(({ department }) => {
    // Matcher is used to grab only the department id, we use the same trick of converting the worded department name into a number
    let matcher = currentDepartments.indexOf(department) + 1;
    // Inner join is used to filter out any null values in the tables
    connection.query(
      "SELECT departments.id, title, salary, first_name, last_name FROM departments INNER JOIN roles on departments.id = roles.department_id INNER JOIN employees on roles.id = employees.role_id",
      (err, res) => {
        if (err) throw err;
        let budget = [];
        res.forEach((index) => {
          if (index.id === matcher) {
            budget.push(index.salary);
          }
        });
        // If nothing matched, then terminate the function before we get to the reduce method which can cause errors
        if (budget.length === 0) {
          console.log("There is no one currently workng in this department :(");
          init();
        } else {
          let total = budget.reduce(
            (accumulator, currentValue) => accumulator + currentValue
          );
          console.log(
            `The budget for the ${department} Department is $${total}.`
          );
          init();
        }
      }
    );
  });
};

init();
