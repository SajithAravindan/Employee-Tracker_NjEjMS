
//Parent Class for all CRUD Funtinality
class crud_actions {
    constructor (tblname){//constructor takes in table name in which the CRUD action will be done.
        this.tblname = tblname;
    }
}

module.exports = crud_actions;//export this class.