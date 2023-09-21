const crud_sections = require('./crud_sections.js');
const db = require("../db/connection");

// this class is child of parent class shape
// renders square using svg literal template
class departments extends crud_sections {
    constructor(tblname) {
        super(tblname);
    };

    addDepartment() {
        const sql =`INSERT INTO department (name) VALUES (?)`;
        
    }

    updateDepartment() {
        const sql = `INSERT INTO department (dpt_name)
        VALUES ("${this.dpt_name}")`;
        return db.promise().query(sql);
    }

};