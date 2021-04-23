let { currentRoles, currentEmployees } = require("./renderTables");

module.exports = [
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
