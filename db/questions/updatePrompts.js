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
    type: "input",
    name: "id",
    message: "What is the ID of the employee you wish to update?",
    validate(value) {
      if (isNaN(value) === false) {
        return true;
      }
      return false;
    },
  },
  {
    type: "input",
    name: "mgrId",
    message: "What is the ID of employee's new manager?",
    validate(value) {
      if (isNaN(value) === false) {
        return true;
      }
      return false;
    },
  },
];

module.exports = { updateMenu, updateEmpRole, updateEmpMgr };
