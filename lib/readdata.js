const crud_actions = require('./crud_actions.js');
//const mysql = require('mysql2');
const dbConnection = require("../db/connection");

class readdata extends crud_actions {
    constructor(tblname) {
        super(tblname);
    };
    
    async viewAll() {
        const sql = `SELECT * from ${this.tblname}`;
        const [rows] = await dbConnection
            .promise()
            .query(sql);
        return rows;
      }

    //Method to view conditional data.
    //Arguments: columnNames - Table Column Names, dataValues - Relative Values.
    //Return: Operation Status 
    async viewConditional(conditionalID, conditionalIdVal) {
        const strReturn = "View Failed";
        const sqlquery1 = `SELECT * from ${this.tblname} where ?? = ?`; 
        const [rows] = await dbConnection
            .promise()
            .query(sqlquery1, [conditionalID, conditionalIdVal]);
        return rows;                       
    }

    async viewAllEmployees() {        
        const sqlqueryEmp = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
        FROM employee
        LEFT JOIN employee manager on manager.id = employee.manager_id
        INNER JOIN role ON (role.id = employee.role_id)
        INNER JOIN department ON (department.id = role.department_id)
        ORDER BY employee.id;`;        
       
        const [rows] = await dbConnection
            .promise()
            .query(sqlqueryEmp);
        return rows;                 
    }

    async viewBudgetByDept(deptID) {        
        const sqlqueryEmp = `SELECT sum(r.salary) as Combined_Salary, d.name as Department FROM 
        employee e JOIN role r ON e.role_id = r.id JOIN department d ON r.department_id = d.id 
        WHERE d.id = ?;`;        
        const [rows] = await dbConnection
            .promise()
            .query(sqlqueryEmp,[deptID]);
        return rows;           
    }

    async viewEmpByMgr(mgrID) {        
        const sqlqueryEmp = `SELECT e.id, e.first_name, e.last_name, role.title, department.name, 
        role.salary, CONCAT(m.first_name, ' ', m.last_name) manager FROM employee m RIGHT JOIN 
        employee e ON e.manager_id = m.id JOIN role ON e.role_id = role.id JOIN department ON 
        department.id = role.department_id WHERE e.manager_id = ? ORDER BY e.id ASC;`;   

        const [rows] = await dbConnection
            .promise()
            .query(sqlqueryEmp,[mgrID]);
        return rows;           
    }

    
};

module.exports = readdata;