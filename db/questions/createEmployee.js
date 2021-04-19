module.exports = [
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
