let { rolesList, employeesList } = require("./buildLists");

const updateMenu = [
  {
    type: "list",
    name: "update",
    message: "What would you like to update?",
    choices: ["Role", "Manager"],
  },
];

const updateEmpRole = [
  {
    type: "list",
    name: "employee",
    message: "Who's role would you like to update?",
    choices: employeesList,
  },
  {
    type: "list",
    name: "role",
    message: "Please input their new role.",
    choices: rolesList,
  },
];

const updateEmpMgr = [
  {
    type: "list",
    name: "employee",
    message: "Who would you like to assign to a new manager?",
    choices: employeesList,
  },
  {
    type: "list",
    name: "manager",
    message: "WHo is their new manager",
    choices: employeesList,
  },
];

module.exports = { updateMenu, updateEmpRole, updateEmpMgr };
