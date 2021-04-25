// dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");
const console_table = require("console.table");
const viewMenu = require("./db/questions/mainMenu");
const {
  updateMenu,
  updateEmpRole,
  updateEmpMgr,
} = require("./db/questions/updatePrompts");
const {
  createMenu,
  createRoleQues,
  createEmployeeQues,
  createDeptQues,
} = require("./db/questions/createPrompts");
const {
  removeMenu,
  deleteDepartment,
  deleteRole,
  deleteEmployee,
} = require("./db/questions/removePrompts");

let {
  rolesList,
  employeesList,
  depaertmentsList,
  viewDeptBudget,
  buildEmployeesList,
  buildRolesList,
  buildDepartmentsList,
} = require("./db/questions/buildLists");

const { username, pass } = require("./config");

const viewDb = [
  {
    type: "list",
    name: "db",
    message: "Which Database would you like to view?",
    choices: ["Departments", "Roles", "Employees"],
  },
];

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: username,
  password: pass,
  database: "cms",
});

const init = () => {
  buildRolesList();
  buildEmployeesList();
  buildDepartmentsList();
  mainMenu();
};

const mainMenu = () => {
  inquirer.prompt(viewMenu).then((data) => {
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
  console.log(rolesList);
  console.log(employeesList);
  inquirer.prompt(updateMenu).then((data) => {
    if (data.update === "Role") {
      updateRole();
    } else if (data.update === "Manager") {
      updateMgr();
    }
  });
};

const updateRole = () => {
  inquirer.prompt(updateEmpRole).then(({ role, employee }) => {
    connection.query(
      "UPDATE employees SET role_id = ? WHERE id = ?",
      [rolesList.indexOf(role) + 1, parseInt(employee)],
      (err, res) => {
        if (err) throw err;
        console.log(`${employee}'s role has been updated to ${role}.`);
        init();
      }
    );
  });
};

const updateMgr = () => {
  inquirer.prompt(updateEmpMgr).then(({ employee, manager }) => {
    connection.query(
      "UPDATE employees SET manager_id = ? WHERE id = ?",
      [parseInt(manager), parseInt(employee)],
      (err, res) => {
        if (err) throw err;
        console.log(`${employee}'s manager has been updated to ${manager}.`);
        init();
      }
    );
  });
};

const remove = () => {
  inquirer.prompt(removeMenu).then((data) => {
    if (data.remove === "Departments") {
      removeDepartment();
    } else if (data.remove === "Roles") {
      removeRole();
    } else if (data.remove === "Employees") {
      removeEmployee();
    }
  });
};

const removeDepartment = () => {
  inquirer.prompt(deleteDepartment).then(({ department }) => {
    connection.query(
      "DELETE FROM departments WHERE name = ?",
      [department],
      (err, res) => {
        if (err) {
          if (err) throw err;
        } else {
          console.log(`${department} has been removed from the database.`);
          depaertmentsList.splice(depaertmentsList.indexOf(department), 1);
        }
      }
    );
    init();
  });
};

const removeRole = () => {
  inquirer.prompt(deleteRole).then(({ role }) => {
    connection.query(
      "DELETE FROM roles WHERE title = ?",
      [role],
      (err, res) => {
        if (err) {
          if (err) throw err;
        } else {
          console.log(`${role} has been removed from the database.`);
          rolesList.splice(rolesList.indexOf(role), 1);
        }
        init();
      }
    );
  });
};

const removeEmployee = () => {
  inquirer.prompt(deleteEmployee).then(({ employee }) => {
    connection.query(
      "DELETE FROM employees WHERE id = ?",
      [parseInt(employee)],
      (err, res) => {
        if (err) throw err;
        console.log(`${employee} has been removed from the database.`);
        employeesList.splice(employeesList.indexOf(employee), 1);
      }
    );
    init();
  });
};

const deptBudget = () => {
  inquirer.prompt(viewDeptBudget).then(({ department }) => {
    let target = depaertmentsList.indexOf(department) + 1;
    connection.query(
      "SELECT departments.id, title, salary, first_name, last_name FROM departments INNER JOIN roles on departments.id = roles.department_id INNER JOIN employees on roles.id = employees.role_id",
      (err, res) => {
        if (err) throw err;
        let budget = [];
        res.forEach((index) => {
          if (index.id === target) {
            budget.push(index.salary);
          }
        });
        if (budget.length === 0) {
          console.log("There is no one currently workng in this department.");
          init();
        } else {
          let totalBudget = budget.reduce(
            (accumulator, currentValue) => accumulator + currentValue
          );
          console.log(
            `The ${department} Department's budget is currently $${totalBudget}.`
          );
          init();
        }
      }
    );
  });
};

init();
