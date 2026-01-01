const db = require("../config/db");

exports.getAll = () => {
  return db.promise().query("SELECT * FROM prestasi ORDER BY created_at DESC");
};

exports.create = (image, description) => {
  return db
    .promise()
    .query(
      "INSERT INTO prestasi (image, description) VALUES (?, ?)",
      [image, description]
    );
};

exports.remove = (id) => {
  return db.promise().query("DELETE FROM prestasi WHERE id = ?", [id]);
};
