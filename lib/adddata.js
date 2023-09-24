//Importing Dependencies
const crud_actions = require('./crud_actions.js');
const dbConnection = require("../db/connection");

//Class adddata extends the parent class.
//Class intiated when there is a requirement for Data CREATION in 'C'RUD
class adddata extends crud_actions {
    constructor(tblname) {
        super(tblname);
    };

    //Method to Insert data.
    //Arguments: columnNames - Table Column Names, dataValues - Relative Values.     
    addNewData(columnNames, dataValues) {        
        const sqlquery = `INSERT INTO ${this.tblname} (${columnNames}) VALUES (?)`;//parameterized Query
        return dbConnection.promise().query(sqlquery, [dataValues]);//return results  with a promise.               
    }
};

module.exports = adddata;//export this class.