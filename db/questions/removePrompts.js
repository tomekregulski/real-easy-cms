let { rolesList, departmentsList, employeesList } = require("./buildLists");

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
    name: "department",
    message: "Please select which department to delete.",
    choices: departmentsList,
  },
];

const deleteRole = [
  {
    type: "list",
    name: "role",
    message: "Please select which role to delete.",
    choices: rolesList,
  },
];

const deleteEmployee = [
  {
    type: "list",
    name: "employee",
    message: "Please select which employee to delete.",
    choices: employeesList,
  },
];

module.exports = { removeMenu, deleteDepartment, deleteRole, deleteEmployee };
