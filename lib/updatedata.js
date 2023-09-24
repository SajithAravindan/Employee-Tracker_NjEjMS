//Importing Dependencies
const crud_actions = require('./crud_actions.js');
const dbConnection = require("../db/connection");

//Class updatedata extends the parent class.
//Class intiated when there is a requirement for Data UPDATE/EDIT in CR'U'D
class updatedata extends crud_actions {
    constructor(tblname) {
        super(tblname);
    };

    //Method to Update data.
    //Arguments: columnNames - Table Column Names, dataValues - Relative column Values, columnID - Data column ID, dataID - Id to Update.
    //Return: Operation Status
    updateExistingData(columnNames, dataValues, columnID, dataID) {         
        const columns = columnNames; //Column names
        const values = dataValues; //Relative values
        //Parameterized Query
        const setClause = columns.map((col) => `${col} = ?`).join(', ');//Array of columns
        const sql = `UPDATE ${this.tblname} SET ${setClause} WHERE ${columnID} = ?`; //query       
        const params = [...values, dataID]; //Params for the prepared statement 
        return dbConnection.promise().query(sql, params);  
    }
}

module.exports = updatedata;//Export Class