module.exports = [
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
