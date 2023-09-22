const crud_actions = require('./crud_actions.js');
const mysql = require('mysql2');
const dbConnection = require("../db/connection");

class updatedata extends crud_actions {
    constructor(tblname) {
        super(tblname);
    };

    //Method to Update data.
    //Arguments: columnNames - Table Column Names, dataValues - Relative Values, dataID - Id to Update.
    //Return: Operation Status
    updateExistingData(columnNames, dataValues, columnID, dataID) {
        const strReturn = "Updation Failed";
        // Define dynamic table name, column names, and values
        
        const columns = columnNames; // Add your column names
        const values = dataValues; // Add corresponding values

        // Construct the SQL query using template literals
        const setClause = columns.map((col) => `${col} = ?`).join(', ');
        const sql = `UPDATE ${this.tblname} SET ${setClause} WHERE ${columnID} = ?`; 

        // Define the parameters for the prepared statement
        const params = [...values, dataID]; 
        
        // Execute the prepared statement         
        return dbConnection.promise().query(sql, params);  
    }
}

module.exports = updatedata;