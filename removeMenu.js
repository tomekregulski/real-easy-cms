module.exports = [
  {
    type: "list",
    name: "remove",
    message: "Which databse would you like to remove from?",
    choices: ["Departments", "Roles", "Employees"],
  },
  {
    type: "input",
    name: "id",
    message: "What is the ID of the entry you would like to remove?",
  },
];
