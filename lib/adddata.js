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
    addNewData(columnNames, dataValues) {
        const strReturn = "Insertion Failed";
        const sqlquery = `INSERT INTO ${this.tblname} (${columnNames}) VALUES (?)`;
        dbConnection.promise.query(sqlquery, [dataValues], function (err, res) {
            if (err) strReturn = err;
            strReturn = `Successfully inserted a new record - ${dataValues} , in Table ${this.tblname}`;
        });

        dbConnection.end();// Close the database connection
        return strReturn; //Return Status        
    }
};

module.exports = adddata;