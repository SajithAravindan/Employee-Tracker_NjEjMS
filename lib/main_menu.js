//Importing Dependencies
const inquier = require('inquirer');
const dbconnection = require("../db/connection");
//Importing CRUD Classes
const createData = require('./adddata.js');//includes Class to Create Data
const viewData = require('./readdata.js');//includes Class to View/Get Data
const updateData = require('./updatedata.js');//includes Class for Updating Data
const deleteData = require('./deletedata.js');//includes Class for Delete Data

const questions = require('./questions');//Inquier Questions

// Funtion to prompt the user to answer 
// questions in the command line and calls relevant Funtionalities also catches any errors.
function startQuestions() {
    inquier.prompt(questions)
        .then(response => {
            switch (response.action) {//Switch to call all relevant Funtions
                case "View all employees":
                    viewAll("EMPLOYEE");
                    break;
                case "View all roles":
                    viewAll("ROLE");
                    break;
                case "View all departments":
                    viewAll("DEPARTMENT");
                    break;
                case "Add a department":
                    addNewDepartment();
                    break;
                case "Add a role":
                    addNewRole();
                    break;
                case "Add an employee":
                    addNewEmployee();
                    break;
                case "Update role for an employee":
                    updateEmployeeRole();
                    break;
                case "Update employee's manager":
                    updateEmployeeManager();
                    break;
                case "Delete a department":
                    deleteDepartment();
                    break;
                case "Delete a role":
                    deleteRole();
                    break;
                case "Delete an employee":
                    deleteEmployee();
                    break;
                case "View employees by manager":
                    viewEmployeeByManager();
                    break;
                case " ":
                    viewEmployeeByDepartment();
                    break;
                case "View the total utilized budget of a department":
                    viewBudget();
                    break;
                case "Exit Application":
                    exitapp();
                    break;
                default:
                    dbconnection.end();//close Connection
            }
        })
        .catch(err => {
            console.error(err);
        });
}

//Function to view all data.
//Arguments: Table Name.
function viewAll(table) {
    let query;
    if (table === "EMPLOYEE") {
        var empDetlss = new viewData(table);//Initiate View Object
        empDetlss
            .viewAllEmployees()//Call View method
            .then((rows) => {
                console.clear();
                console.log(`
              ==================
                All ${table}s
              ==================
              `);
                customConsoleTable(rows);//Call function to display data.
            })
            .then(() => {
                startQuestions();//Call back Main Menu
            });
    }
    else if (table === "ROLE" || table === "DEPARTMENT") {
        var empDetlss = new viewData(table);//Initiate View Object
        empDetlss
            .viewAll()//Call View all method
            .then((rows) => {
                console.clear();
                console.log(`
              =================
                All ${table}s
              =================
              `);
                customConsoleTable(rows);//Call function to display data.
            })
            .then(() => {
                startQuestions();//Call back Main Menu
            });
    }
};

// ----------- All Employee related Functionalities---------------
//Function to add New Employee.
function addNewEmployee() {
    console.clear();//clear console
    var mgrData = [];//Array to hold Managers Data
    var rolesData = [];//Array to hold Roles
    const roleDetlss = new viewData("ROLE");//Initiate Object to get Roles
    const empDetlss = new viewData("EMPLOYEE");//Initiate Object to get Manager 
    roleDetlss.viewAll().then((roles) => {//Call to get Roles
        rolesData = roles.map(role => ({ name: role.title, value: role.id }));//Map roles Data
        empDetlss.viewAllEmployees().then((mgr) => {//Call to get Manager 
            mgrData = mgr.map(employee => ({ name: employee.first_name + ' ' + employee.last_name, value: employee.id }));//Map Manager Data
            mgrData.push("None");//add a 'None' option
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
                    const createEmp = new createData("employee");//Initiate Create Object
                    if (mgnrid === "None") mgnrid = null;//If No Manager is selected, value Null is added.
                    const columnNames = ["first_name", "last_name", "role_id", "manager_id"];//Column Names
                    const dataValues = [firstname, lastname, roleid, mgnrid];//Related Values for Columns
                    createEmp.addNewData(columnNames, dataValues)//Call Create Method, Column Names and Data is passed.
                        .then((data) => {
                            console.table(`

                        ==================================
                            Added employee successfully
                        ==================================

                        `);
                        })
                        .catch((error) => {
                            console.error('Error in main function:', error);
                        })
                        .then(() => {
                            startQuestions();//Call back Main Menu
                        });
                })
        });
    })
};

//Function to Update Employee Role.
function updateEmployeeRole() {
    console.clear();//clear console    
    var toUpdateRoles = [];//Array to hold Roles
    const roleDetlss = new viewData("ROLE");//Initiate Object to get Roles
    const empDetlss = new viewData("EMPLOYEE");//Initiate Object to get Manager 
    roleDetlss.viewAll().then((roles) => {//Call to get Roles
        toUpdateRoles = roles.map(role => ({ name: role.title, value: role.id }));//Map roles Data
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
                    choices: toUpdateRoles,
                },
            ])
            .then(({ emp_id, roleselect_id }) => {
                const UpdateEmpRole = new updateData("employee");//Initiate Create Object
                const columnNames = ["role_id"];//Column Names
                const dataValues = [roleselect_id];//Related Values for Columns
                //Call Update Method, 
                //Paramers: Column Names & Data to update, Column & value against which Update is done.
                UpdateEmpRole.updateExistingData(columnNames, dataValues, "id", emp_id)
                    .then((data) => {
                        console.table(`

                        ==================================
                        Updated Employee's Role successfully
                        ==================================

                        `);
                    })
                    .catch((error) => {
                        console.error('Error in main function:', error);
                    })
                    .then(() => {
                        startQuestions();//Call back Main Menu
                    });
            })
    })
};

//Function to Update Employee's Manager.
function updateEmployeeManager() {
    console.clear();//Clear Console
    var toUpdateMgrEmp = [];//Array to hold User/Manager Details
    const empDetlss = new viewData("EMPLOYEE");//Initiate Object to get Manager Details
    empDetlss.viewAllEmployees().then((mgr) => {//Call to get User/Manager
        toUpdateMgrEmp = mgr.map(employee => ({ name: employee.first_name + ' ' + employee.last_name, value: employee.id }));//Map User/Manager Data
        inquier
            .prompt([
                {
                    type: "list",
                    name: "emp_id",
                    message: "Which employee would you like to update the manager for?",
                    choices: toUpdateMgrEmp,
                },
                {
                    type: "list",
                    name: "mgrselect_id",
                    message: "Who should the employee\'s new manager be?",
                    choices: toUpdateMgrEmp,
                },
            ])
            .then(({ emp_id, mgrselect_id }) => {
                const UpdateEmpRole = new updateData("employee");//Initiate Update Object
                const columnNames = ["manager_id"];//Column Names
                const dataValues = [mgrselect_id];//Related Values for Columns
                //Call Update Method, 
                //Paramers: Column Names & Data to update, Column & value against which Update is done.
                UpdateEmpRole.updateExistingData(columnNames, dataValues, "id", emp_id)
                    .then((data) => {
                        console.log(`
                        
                        ==========================
                        Updated Employee's Manager 
                        ==========================

                        `);
                    })
                    .catch((error) => {
                        console.error('Error in main function:', error);
                    })
                    .then(() => {
                        startQuestions();//Call back Main Menu
                    });
            })
    });
};

//Function to Delete Employee.
function deleteEmployee() {
    console.clear();//Clear Console
    var toDeleteEmp = [];//Array to hold User Details
    const EmpDetls = new viewData("employee");//Initiate Object to get Employees Details
    EmpDetls.viewAll().then((emp) => {//Call to get Employee
        toDeleteEmp = emp.map(emps => ({ name: emps.first_name + ' ' + emps.last_name, value: emps.id }));//Map User Data
        inquier
            .prompt([
                {
                    type: "list",
                    name: "emp_id",
                    message: "Which Employee would you like to remove?",
                    choices: toDeleteEmp,
                },
            ])
            .then(({ emp_id }) => {
                const deleteEmp = new deleteData("employee");//Initiate delete Object
                const columnName = ["id"];//Column Names
                const columnId = [emp_id];//Related Values for Columns
                deleteEmp.deleteExistingdata(columnName, columnId)//Call Delete Method, Column Names and Data is passed.
                    .then((data) => {
                        console.clear();
                        console.table(`

                        ==========================
                            Employee Deleted 
                        ==========================

                        `);
                    })
                    .catch((error) => {
                        console.error('Error in main function:', error);
                    })
                    .then(() => {
                        startQuestions();//Call back Main Menu
                    });
            })
    });
};

//Function to view Employee By Manager.
function viewEmployeeByManager() {
    console.clear();//Clear Console
    var mgrEmp = [];//Array to hold User Details
    const empDetlss = new viewData("EMPLOYEE");//Initiate Object to get Employees Details
    empDetlss.viewAll().then((mgr) => {//Call to get Employee
        mgrEmp = mgr.map(employee => ({ name: employee.first_name + ' ' + employee.last_name, value: employee.id }));//Map User/Manager Data
        inquier
            .prompt([
                {
                    type: "list",
                    name: "mgr_id",
                    message: "Which manager would you like to see the employee\'s of?",
                    choices: mgrEmp,
                },
            ])
            .then(({ mgr_id }) => {
                empDetlss.viewEmpByMgr(mgr_id)
                    .then((rows) => {
                        console.log(`
                        
                        ==========================
                            Employees by Manager 
                        ==========================

                        `);
                        customConsoleTable(rows);//Call function to display data.
                    })
                    .catch((error) => {
                        console.error('Error in main function:', error);
                    })
                    .then(() => {
                        startQuestions();//Call back Main Menu
                    });
            })
    });
};

//Function to view Employee By Department.
function viewEmployeeByDepartment() {
    console.clear();//Clear Console
    var deptDetls = [];//Array to hold Department Details
    const deptDetlss = new viewData("department");//Initiate Object to get Employees Details
    deptDetlss.viewAll().then((dept) => {//Call to get Employee
        deptDetls = dept.map(department => ({ name: department.name, value: department.id }));//Map User/Manager Data
        inquier
            .prompt([
                {
                    type: "list",
                    name: "dept_id",
                    message: "Which department would you like to see the employee\'s of?",
                    choices: deptDetls,
                },
            ])
            .then(({ dept_id }) => {
                deptDetlss.viewEmpByDept(dept_id)
                    .then((rows) => {
                        console.log(`
                        
                        ================================
                            Employees by Department 
                        ================================

                        `);
                        customConsoleTable(rows);//Call function to display data.
                    })
                    .catch((error) => {
                        console.error('Error in main function:', error);
                    })
                    .then(() => {
                        startQuestions();//Call back Main Menu
                    });
            })
    });
};

//All Add Functionality -------------------
//Function to add New Department.
function addNewDepartment() {
    console.clear();//Clear Console
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
            const createDepartment = new createData("department");//Initiate Create Object
            let columnNames = ["name"];//Column Names
            let dataValues = [newDptName];//Column Value
            createDepartment.addNewData(columnNames, dataValues)//Call Add New Method
                .then((data) => {
                    console.table(`
                    ============================
                        Added New department 
                    ============================
                    `);
                })
                .catch((error) => {
                    console.error('Error in main function:', error);
                })
                .then(() => {
                    startQuestions();//Call back Main Menu
                });
        });
};

//Function to add New Department.
function addNewRole() {
    console.clear();//Clear Console
    var deptData = [];//Array to hold User Details
    const deptDetls = new viewData("department");//Initiate Object to get All department Details
    deptDetls.viewAll().then((deptls) => {
        deptData = deptls.map(dept => ({ name: dept.name, value: dept.id }));//Map department Data
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
                const createRole = new createData("role");//Initiate Create Object
                let columnNames = ["title", "salary", "department_id"];//Column Names
                let dataValues = [newRoleName, roleSalary, newRoleDpt];//Column Data
                createRole.addNewData(columnNames, dataValues)//Call Add New Method
                    .then((data) => {
                        console.table(`
                        ============================
                            Added New Role 
                        ============================
                        `);
                    })
                    .catch((error) => {
                        console.error('Error in main function:', error);
                    })
                    .then(() => {
                        startQuestions();//Call back Main Menu
                    });
            });
    })
};

//Function to Delete Department.
function deleteDepartment() {
    console.clear();//Clear Console
    var toDeleteDept = [];//Array to hold Department Details
    const departmentDetls = new viewData("department");
    departmentDetls.viewAll().then((dept) => {//Call View All Method
        toDeleteDept = dept.map(departments => ({ name: departments.name, value: departments.id }));//Map Department Details
        inquier
            .prompt([
                {
                    type: "list",
                    name: "dept_id",
                    message: "Which Department would you like to remove?",
                    choices: toDeleteDept,
                },
            ])
            .then(({ dept_id }) => {
                const deleteDepartment = new deleteData("department");//Initiate Deleta Object
                const columnName = ["id"];//Column Name
                const columnId = [dept_id];// Column Data
                deleteDepartment.deleteExistingdata(columnName, columnId)//Call Delete Method
                    .then((data) => {
                        console.table(`

                        ==========================
                            Department Deleted 
                        ==========================

                        `);
                    })
                    .catch((error) => {
                        console.error('Error in main function:', error);
                    })
                    .then(() => {
                        startQuestions();//Call back Main Menu
                    });
            })
    });
};

//Function to Delete Role.
function deleteRole() {
    console.clear();//Clear Console
    var toDeleteRole = [];//Array to hold Role Details
    const RoleDetls = new viewData("role");
    RoleDetls.viewAll().then((role) => {//Call View All Method
        toDeleteRole = role.map(roles => ({ name: roles.title, value: roles.id }));//Map Role Details
        inquier
            .prompt([
                {
                    type: "list",
                    name: "role_id",
                    message: "Which Role would you like to remove?",
                    choices: toDeleteRole,
                },
            ])
            .then(({ role_id }) => {
                const deleteRole = new deleteData("role");//Initiate Deleta Object
                const columnName = ["id"];// Column Name
                const columnId = [role_id];// Column Data
                deleteRole.deleteExistingdata(columnName, columnId)//Call Delete Method
                    .then((data) => {
                        console.table(`

                        ==========================
                            Role Deleted 
                        ==========================

                        `);
                    })
                    .catch((error) => {
                        console.error('Error in main function:', error);
                    })
                    .then(() => {
                        startQuestions();//Call back Main Menu
                    });
            })
    });//mgr closeMg
};

//Function to view view Budget departmentwise
function viewBudget() {
    console.clear();//Clear Console
    var deptData = [];//Array to Hold department Data
    const deptDetls = new viewData("department");//Initiate View Object
    deptDetls.viewAll().then((deptls) => {//Call View All Method
        deptData = deptls.map(dept => ({ name: dept.name, value: dept.id }));//Map department Data
        inquier
            .prompt([
                {
                    type: "list",
                    name: "dept_id",
                    message: "Which department budget would you like to see?",
                    choices: deptData,
                },
            ])
            .then(({ dept_id }) => {
                deptDetls.viewBudgetByDept(dept_id)//Call view Budget By department Method 
                    .then((rows) => {
                        console.log(`
          ================================================
                Total utilized budget of a department
          ================================================
          `);
                        customConsoleTable(rows);//Call function to display data.
                    })
                    .then(() => {
                        startQuestions();//Call back Main Menu
                    });
            })
    });//mgr closeMg
};

//Function to display data in console
function customConsoleTable(data) {
    if (data.length === 0) {//Get the Data length
        console.log("No data to display.");
        return;
    }
    // Extract column names from the first row
    const columns = Object.keys(data[0]);
    // Calculate column widths
    const columnWidths = {};//Array to hold all Column Widths
    columns.forEach((column) => {
        columnWidths[column] = Math.max(
            column.length,
            ...data.map((row) => String(row[column]).length)
        );
    });
    //Generate the table header
    let table = '';//Variable to hold the whole Table
    columns.forEach((column) => {
        table += column.padEnd(columnWidths[column]) + '  ';
    });
    table += '\n';
    //Add a separator line after the headers
    columns.forEach((column) => {
        table += '-'.repeat(columnWidths[column]) + '  ';// adds --- line below the headers
    });
    table += '\n';//Adds a line break

    // Generate the table rows
    data.forEach((row) => {
        columns.forEach((column) => {
            table += String(row[column]).padEnd(columnWidths[column]) + '  ';
        });
        table += '\n';//Adds a line break for next row
    });
    console.log(table);//Display the Data table.
}

function exitapp() {
    console.clear();
    console.log("Shutting down...");
    process.exit(0);
}

module.exports = startQuestions;