const mysql = require("mysql2");

const dbConnection = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "mysql@0411",
    database: "employees_db",
  },
  console.log("Connected to the Employee Tracking database.")
);

module.exports = dbConnection;