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
        return dbConnection.promise().query(sqlquery, [dataValues]);               
    }
};

module.exports = adddata;