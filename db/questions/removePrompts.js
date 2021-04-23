let {
  currentRoles,
  currentDepartments,
  currentEmployees,
} = require("./renderTables");

const removeMenu = [
  {
    type: "list",
    name: "remove",
    message: "Which databse would you like to remove from?",
    choices: ["Departments", "Roles", "Employees"],
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

const deleteEmployee = [
  {
    type: "list",
    name: "deleteEmployee",
    message: "Please select which employee to delete.",
    choices: currentEmployees,
  },
];

module.exports = { removeMenu, deleteDepartment, deleteRole, deleteEmployee };
