//Global Variables
const inquier = require('inquirer');
const dbconnection = require("../db/connection");

//Departments
const createData = require('./adddata.js');
const viewData = require('./readdata.js');
const updateData = require('./updatedata.js');
const deleteData = require('./deletedata.js');
//Inquier Questions
const questions = require('./questions');

// Funtion initializes, utilizes inquirer .prompt to prompt the user to answer 
// questions in the command line and save user input then generate Logo using responses, catch any errors
function startQuestions() {
    inquier.prompt(questions)
        .then(response => {
            switch (response.action) {
                case "View all employees":
                    viewAll("EMPLOYEE");
                    break;
                case "View all roles":
                    viewAll("ROLE");
                    break;
                case "View all departments":
                    viewAll("DEPARTMENT");
                    break;
                case "add a department":
                    addNewDepartment();
                    break;
                case "add a role":
                    addNewRole();
                    break;
                case "add an employee":
                    addNewEmployee();
                    break;               
                case "update role for an employee":
                    //updateEmployeeRole();
                    break;
                case "update employee's manager":
                    //updateEmployeeManager();
                    break;
                case "delete a department":
                    //deleteDepartment();
                    break;
                case "delete a role":
                    //deleteRole();
                    break;
                case "delete an employee":
                    //deleteEmployee();
                    break;
                case "view employees by manager":
                    //viewEmployeeByManager();
                    break;
                case "View the total utilized budget of a department":
                    //viewBudget();
                    break;
                case "Quit":
                    exit();
                    break;
                default:
                    dbconnection.end();
            }
        })
        .catch(err => {
            console.error(err);
        });
}

function viewAll(table) {
    // const query = `SELECT * FROM ${table}`;
    let query;
    if (table === "EMPLOYEE") {
        var empDetlss = new viewData(table);
        empDetlss
            .viewAllEmployees()
            .then((rows) => {
                console.clear();
                console.log(`
              =================
               All ${table}s
              =================
              `);
                console.table(rows);
            })
            .then(() => {
                //dbconnection.end();
                startQuestions();
            });
    }
    else if (table === "ROLE" || table === "DEPARTMENT") {
        var empDetlss = new viewData(table);
        empDetlss
            .viewAll()
            .then((rows) => {
                console.clear();
                console.log(`
              =================
              All ${table}s
              =================
              `);
                console.table(rows);
            })
            .then(() => {
                //dbconnection.end();
                startQuestions();
            });
    }
};

function addNewEmployee() {
    console.clear();
    var mgrData = [];
    var rolesData = [];
    const roleDetlss = new viewData("ROLE");
    const empDetlss = new viewData("EMPLOYEE");
    roleDetlss.viewAll().then((roles) => {
        rolesData = roles.map(role => ({ name: role.title, value: role.id }));
        empDetlss.viewAllEmployees().then((mgr) => {
            mgrData = mgr.map(employee => ({ name: employee.first_name + ' ' + employee.last_name, value: employee.id }));
            mgrData.push("None");
            inquier
                .prompt([
                    {
                        type: "text",
                        name: "firstname",
                        message: "Enter First Name.",
                        validate: (name) => {
                            if (!name) {
                                console.log("Please enter a first name for this employee!");
                            }
                            return true;
                        },
                    },
                    {
                        type: "text",
                        name: "lastname",
                        message: "Enter Last Name.",
                        validate: (name) => {
                            if (!name) {
                                console.log("Please enter a last name for this employee!");
                            }
                            return true;
                        },
                    },
                    {
                        type: "list",
                        name: "roleid",
                        message: "What is the new employee's Role?",
                        choices: rolesData,
                    },
                    {
                        type: "list",
                        name: "mgnrid",
                        message: "Who is the new employee's manager?",
                        choices: mgrData,
                    },
                ])
                .then(({ firstname, lastname, roleid, mgnrid }) => {
                    //let truncRoleId = roleid.split(" ");
                    //let truncManId = mgnrid.split(" ");
                    const createEmp = new createData("employee");
                    if (mgnrid === "None") mgnrid = null;
                    const columnNames = ["first_name", "last_name", "role_id", "manager_id"];
                    const dataValues = [firstname, lastname, roleid, mgnrid];
                    createEmp.addNewData(columnNames, dataValues)
                        .then((data) => {
                            console.clear();
                            //viewAllEmployeesMenu();
                            console.table("Added employee \n");
                        })
                        .catch((error) => {
                            console.error('Error in main function:', error);
                        })
                        .then(() => {
                            //dbconnection.end();
                            startQuestions();
                        });
                })
        });//mgr closeMg      
    }) //roles close 
};

function updateEmployeeRole(){
    console.clear();
    var toUpdateEmp = [];
    var toUpdateRoles = [];
    const roleDetlss = new viewData("ROLE");
    const empDetlss = new viewData("EMPLOYEE");
    roleDetlss.viewAll().then((roles) => {
        toUpdateRoles = roles.map(role => ({ name: role.title, value: role.id }));
        empDetlss.viewAllEmployees().then((mgr) => {
            toUpdateEmp = mgr.map(employee => ({ name: employee.first_name + ' ' + employee.last_name, value: employee.id }));
            
            inquier
            .prompt([
                {
                  type: "list",
                  name: "emp_id",
                  message: "Which employee's role do you want to update?",
                  choices: toUpdateEmp,
                },
                {
                  type: "list",
                  name: "roleselect_id",
                  message: "Which role do you want to assign the selected employee?",
                  choices:toUpdateRoles,
                },
              ])
                .then(({emp_id, roleselect_id }) => {
                    //let truncRoleId = roleid.split(" ");
                    //let truncManId = mgnrid.split(" ");
                    const UpdateEmpRole = new updateData("employee");
                    if (mgnrid === "None") mgnrid = null;
                    const columnNames = ["role_id"];
                    const dataValues = [roleselect_id];
                    UpdateEmpRole.updateExistingData(columnNames, dataValues,"id", emp_id )
                        .then((data) => {
                            console.clear();
                            //viewAllEmployeesMenu();
                            console.table("Update Employee's Role \n");
                        })
                        .catch((error) => {
                            console.error('Error in main function:', error);
                        })
                        .then(() => {                            
                            startQuestions();
                        });
                })
        });//mgr closeMg      
    }) //roles close 
};

function updateEmployeeManager(){

};

function addNewDepartment() {
    console.clear();
    inquier
        .prompt([
            {
                type: "text",
                name: "newDptName",
                message: "What is the name of the new department?",
                validate: (dptname) => {
                    if (!dptname) {
                        console.log("Please enter a department name!");
                    }
                    return true;
                },
            },
        ])
        .then(({ newDptName }) => {
            const createDepartment = new createData("department");
            let columnNames = ["name"];
            let dataValues = [newDptName];
            createDepartment.addNewData(columnNames, dataValues)
                .then((data) => {
                    console.clear();
                    //viewAllEmployeesMenu();
                    console.table(`
                    ===============
                    Added New department 
                    ================
                    `);
                })
                .catch((error) => {
                    console.error('Error in main function:', error);
                })
                .then(() => {
                    startQuestions();
                });
        });

};

function addNewRole() {
    console.clear();
    var deptData = [];
    const deptDetls = new viewData("department");
    deptDetls.viewAll().then((deptls) => {
        deptData = deptls.map(dept => ({ name: dept.name, value: dept.id }));
        inquier
            .prompt([
                {
                    type: "text",
                    name: "newRoleName",
                    message: "What is the name of this new role?",
                    validate: (rolename) => {
                        if (!rolename) {
                            console.log("Please enter a name for this role!");
                        }
                        return true;
                    },
                },
                {
                    type: "text",
                    name: "roleSalary",
                    message: "How much does this role make per year?",
                    validate: (salary) => {
                        if (!salary) {
                            console.log("Please enter a yearly salary for this role!");
                        }
                        return true;
                    },
                },
                {
                    type: "list",
                    name: "newRoleDpt",
                    message: "What department does this role belong to?",
                    choices: deptData,
                },
            ])
            .then(({ newRoleName, roleSalary, newRoleDpt }) => {
                const createRole = new createData("role");
                let columnNames = ["title", "salary", "department_id"];
                let dataValues = [newRoleName, roleSalary, newRoleDpt];
                createRole.addNewData(columnNames, dataValues)
                    .then((data) => {
                        console.clear();
                        //viewAllEmployeesMenu();
                        console.table("Added Role \n");
                    })
                    .catch((error) => {
                        console.error('Error in main function:', error);
                    })
                    .then(() => {
                        startQuestions();
                    });
            });

    }) //dept close 
};


function exit() {
    console.clear();
    dbconnection.end();
    console.log("Shutting down... hit ctrl + c and use 'npm start' to reboot");
}

module.exports = startQuestions;