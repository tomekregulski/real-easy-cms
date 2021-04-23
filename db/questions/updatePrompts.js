let { currentRoles, currentEmployees } = require("./renderTables");

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

module.exports = { updateMenu, updateEmpRole, updateEmpMgr };
