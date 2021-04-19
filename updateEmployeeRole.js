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
    name: "role",
    message: "What is the employee's new role?",
  },
];
