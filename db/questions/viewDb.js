let currentDepartments = require("./renderTables");

const viewDb = [
  {
    type: "list",
    name: "db",
    message: "Which Database would you like to view?",
    choices: ["Departments", "Roles", "Employees"],
  },
];

const viewDeptBudget = [
  {
    type: "list",
    name: "department",
    message: "Please select which department to check the budget for.",
    choices: currentDepartments,
  },
];

module.exports = { viewDeptBudget, viewDb };
