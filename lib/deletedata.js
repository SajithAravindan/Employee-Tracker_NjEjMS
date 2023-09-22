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
    deleteExistingdata(conditionalID, conditionalIdVal) {
        const strReturn = "Deletion Failed";
        const sqlquery1 = `DELETE FROM ${this.tblname} where ?? = ?`;
        dbConnection.promise.query(sqlquery1, [conditionalID, conditionalIdVal], (err, res) => {
            if (err) strReturn = err;
            else strReturn = `Successfully deleted the record ${conditionalID} = ${conditionalIdVal} , from Table ${this.tblname}`;
        });
        dbConnection.end();// Close the database connection  
        return strReturn; //Return Status                 
    }
};

module.exports = deletedata;