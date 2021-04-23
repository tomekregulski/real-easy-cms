let { currentRoles, currentEmployees } = require("./renderTables");

module.exports = [
  {
    type: "list",
    name: "remove",
    message: "Which databse would you like to remove from?",
    choices: ["Departments", "Roles", "Employees"],
  },
];
