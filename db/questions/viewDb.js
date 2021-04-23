let currentDepartments = require("./renderTables");

const viewChoices = [
  {
    type: "list",
    name: "db",
    message: "Which Database would you like to view?",
    choices: ["Departments", "Roles", "Employees"],
  },
];

module.exports = { viewChoices };
