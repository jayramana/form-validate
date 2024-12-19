const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "sundaramg@1612",
  database: process.env.DB_NAME || "FORMVALIDATE" ,
  port: process.env.DB_PORT || 3306,
});

db.connect((err) => {
  if (err) {
    console.log("Error in connecting to MySQL:", err);
    throw err;
  }
  console.log("MySQL Connected...");
});

module.exports = db; 
