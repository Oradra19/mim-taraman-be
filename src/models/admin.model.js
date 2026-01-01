const db = require("../config/db");

exports.findByUsername = (username) => {
  return db
    .promise()
    .query("SELECT * FROM admins WHERE username = ?", [username]);
};

exports.createAdmin = (username, password) => {
  return db
    .promise()
    .query("INSERT INTO admins (username, password) VALUES (?, ?)", [
      username,
      password,
    ]);
};
