module.exports = [
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
