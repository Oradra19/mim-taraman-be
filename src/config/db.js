require("dotenv").config();
const mysql = require("mysql2");

const db = mysql.createPool({
  host: process.env.MYSQL_ADDON_HOST,
  user: process.env.MYSQL_ADDON_USER,
  password: process.env.MYSQL_ADDON_PASSWORD,
  database: process.env.MYSQL_ADDON_DB,
  port: process.env.MYSQL_ADDON_PORT,
  connectionLimit: 5,
});

console.log("DB HOST:", process.env.MYSQL_ADDON_HOST);
module.exports = db;
orts = db;
