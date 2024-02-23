require("dotenv").config(); // Load environment variables from .env file

const mysql = require("mysql");

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  reconnect: true,
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.stack);
    return;
  } else {
    console.log("Connected to MySQL database");
  }
});

db.on('error', (err) => {
  console.error('MySQL connection error:', err);
});

module.exports = db;
