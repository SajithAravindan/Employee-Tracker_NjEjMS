//const mysql = require('mysql2');
//const dbConnection = require("../db/connection");
//Import Actions
const createData = require('./adddata.js');
const viewData = require('./readdata.js');
const updateData = require('./updatedata.js');
const deleteData = require('./deletedata.js');
const  startQuestions = require('./main_menu.js');

// this class is child of parent class shape
// renders square using svg literal template
class employees {
    constructor(tblname) {
        this.tblname = tblname;
    };

    addEmployee() {

    }

    updateEmployee() {

    }

    viewAllEmployees() {
        
                      
    }
};

module.exports = employees;

