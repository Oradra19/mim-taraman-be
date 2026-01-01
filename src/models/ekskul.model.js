const db = require("../config/db");

exports.getAll = () => {
  return db.promise().query("SELECT * FROM ekstrakurikuler ORDER BY created_at DESC");
};

exports.create = (image, description) => {
  return db
    .promise()
    .query(
      "INSERT INTO ekstrakurikuler (image, description) VALUES (?, ?)",
      [image, description]
    );
};

exports.remove = (id) => {
  return db.promise().query("DELETE FROM ekstrakurikuler WHERE id = ?", [id]);
};
