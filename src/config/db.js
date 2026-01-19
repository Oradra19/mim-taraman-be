require("dotenv").config();
const mysql = require("mysql2");

const db = mysql.createPool({
  host: process.env.MYSQL_ADDON_HOST,
  user: process.env.MYSQL_ADDON_USER,
  password: process.env.MYSQL_ADDON_PASSWORD,
  database: process.env.MYSQL_ADDON_DB,
  port: process.env.MYSQL_ADDON_PORT,
  connectionLimit: 3,
});

// TEST KONEKSI SAAT START
db.getConnection((err, connection) => {
  if (err) {
    console.error("❌ DB Connection Error:", err.message);
  } else {
    console.log("✅ DB Connected");
    connection.release();
  }
});

module.exports = db;
