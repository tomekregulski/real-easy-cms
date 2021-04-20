module.exports = [
  {
    type: "input",
    name: "id",
    message: "What is the ID of the department whose budget you wish to view?",
    validate(value) {
      if (isNaN(value) === false) {
        return true;
      }
      return false;
    },
  },
];
