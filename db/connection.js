const mysql = require("mysql2");

const dbConnection = mysql.createConnection(
  {
    host: "localhost",
    user: "<user>",
    password: "<your password>",
    database: "<database name.",
  },
  console.log("Connected to the Employee Tracking database.")
);

module.exports = dbConnection;