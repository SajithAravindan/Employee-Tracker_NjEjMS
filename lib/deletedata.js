//Importing Dependencies
const crud_actions = require('./crud_actions.js');
const dbConnection = require("../db/connection");

//Class deletedata extends the parent class.
//Class intiated when there is a requirement for Data DELETION in CRU'D'
class deletedata extends crud_actions {
    constructor(tblname) {
        super(tblname);
    };
    
    //Method to Delete data.
    //Arguments: Conditional ID - Column Name, Conditional Value - Relative Values.    
    async deleteExistingdata(conditionalID, conditionalIdVal) {        
        const sqlquery1 = `DELETE FROM ${this.tblname} where ?? = ?`;//parameterized Query
        const [rows] = await dbConnection
            .promise()
            .query(sqlquery1, [conditionalID, conditionalIdVal]);
        return rows;                   
    }
};

module.exports = deletedata;//Export Class