const createMenu = [
  {
    type: "list",
    name: "create",
    message: "What would you like to create?",
    choices: ["Department", "Role", "Employee"],
  },
];

const createRoleQues = [
  {
    type: "input",
    name: "roleTitle",
    message: "What is the name of the new role?",
  },
  {
    type: "input",
    name: "roleSalary",
    message: "What is the salary of the new role?",
    validate(value) {
      if (isNaN(value) === false) {
        return true;
      }
      return false;
    },
  },
  {
    type: "input",
    name: "roleDept",
    message: "What is the ID of the department that this role will be under?",
    validate(value) {
      if (isNaN(value) === false) {
        return true;
      }
      return false;
    },
  },
];

const createEmployeeQues = [
  {
    type: "input",
    name: "firstName",
    message: "What is the Employee's first name?",
  },
  {
    type: "input",
    name: "lastName",
    message: "What is the Employee's last name?",
  },
  {
    type: "input",
    name: "roleId",
    message: "What is the ID of the employee's role?",
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
    message: "What is the ID of the employee's manager?",
    validate(value) {
      if (isNaN(value) === false) {
        return true;
      }
      return false;
    },
  },
];

const createDeptQues = [
  {
    type: "input",
    name: "name",
    message: "What is the name of the new department?",
  },
];

module.exports = {
  createMenu,
  createRoleQues,
  createEmployeeQues,
  createDeptQues,
};
