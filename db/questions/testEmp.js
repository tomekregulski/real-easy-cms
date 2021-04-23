// renderDepartments();
renderRoles();
renderEmployees();

const updateEmpMenu = [
  {
    type: "list",
    name: "selectedEmployee",
    message: "Please select a current employee.",
    choices: currentEmployees,
  },
  {
    type: "list",
    name: "newRole",
    message: "Please input the employee's new role.",
    choices: currentRoles,
  },
];

let currentDepartments;
let renderDepartments = () => {
  currentDepartments = [];
  connection.query("SELECT id, dept_name FROM department", (err, res) => {
    if (err) throw err;
    res.forEach((index) => currentDepartments.push(index.dept_name));
  });
};

let currentRoles;
let renderRoles = () => {
  currentRoles = [];
  connection.query("SELECT id, title FROM roles", (err, res) => {
    if (err) throw err;
    res.forEach((index) => currentRoles.push(index.title));
  });
};

let currentEmployees;
let renderEmployees = () => {
  currentEmployees = [];
  connection.query(
    "SELECT id, first_name, last_name FROM employees",
    (err, res) => {
      if (err) throw err;
      res.forEach((index) =>
        currentEmployees.push(
          `${index.id} - ${index.first_name} ${index.last_name}`
        )
      );
    }
  );
};

// module.exports = { currentEmployees, currentRoles };
