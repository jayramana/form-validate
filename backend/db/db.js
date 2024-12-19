const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "sundaramg@1612",
  database: "FORMVALIDATE",
});

db.connect((err) => {
  if (err) {
    console.log("Error in connecting to MySQL:", err);
    throw err;
  }
  console.log("MySQL Connected...");
});

module.exports = db; 
