const crud_actions = require('./crud_actions.js');
const mysql = require('mysql2');
const dbConnection = require("../db/connection");

class adddata extends crud_actions {
    constructor(tblname) {
        super(tblname);
    };

    //Method to Insert data.
    //Arguments: columnNames - Table Column Names, dataValues - Relative Values.
    //Return: Operation Status 
    viewAll() {
        const strReturn = "View Failed";
        const sqlquery = `SELECT * from ${this.tblname}`;
        dbConnection.promise.query(sqlquery, (err, res) => {
            if (err) return err;
            return res; //Return Data 
        });
        dbConnection.end();// Close the database connection               
    }

    //Method to view conditional data.
    //Arguments: columnNames - Table Column Names, dataValues - Relative Values.
    //Return: Operation Status 
    viewConditional(conditionalID, conditionalVal) {
        const strReturn = "View Failed";
        const sqlquery1 = `SELECT * from ${this.tblname} where ?? = ?`;
        dbConnection.promise.query(sqlquery1, [conditionalID, conditionalVal], (err, res) => {
            if (err) strReturn = err;
            return res; //Return Data 
        });
        dbConnection.end();// Close the database connection               
    }
};

module.exports = adddata;