const crud_actions = require('./crud_actions.js');
const mysql = require('mysql2');
const dbConnection = require("../db/connection");

class deletedata extends crud_actions {
    constructor(tblname) {
        super(tblname);
    };
    
    //Method to view conditional data.
    //Arguments: columnNames - Table Column Names, dataValues - Relative Values.
    //Return: Operation Status 
    async deleteExistingdata(conditionalID, conditionalIdVal) {
        const strReturn = "Deletion Failed";
        const sqlquery1 = `DELETE FROM ${this.tblname} where ?? = ?`;
        const [rows] = await dbConnection
            .promise()
            .query(sqlquery1, [conditionalID, conditionalIdVal]);
        return rows;                   
    }
};

module.exports = deletedata;