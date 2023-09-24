
// Array of questions for user input
const questions = [{
    type: "list",
    name: "action",
    message: "what would you like to do?",
    loop: false,
    choices: ["View all employees", "View all roles", "View all departments", "Add an employee", "Add a role", "Add a department", "Update role for an employee", "Update employee's manager", "View employees by manager", "View employees by department", "Delete a department", "Delete a role", "Delete an employee", "View the total utilized budget of a department", "Exit Application"]
  }]

module.exports = questions;//Export