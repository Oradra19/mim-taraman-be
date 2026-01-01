const db = require("../config/db");

exports.getAll = () => {
  return db.promise().query(
    "SELECT * FROM informasi_terbaru ORDER BY created_at DESC"
  );
};

exports.count = () => {
  return db
    .promise()
    .query("SELECT COUNT(*) AS total FROM informasi_terbaru");
};

exports.create = (image, description) => {
  return db
    .promise()
    .query(
      "INSERT INTO informasi_terbaru (image, description) VALUES (?, ?)",
      [image, description]
    );
};

exports.remove = (id) => {
  return db.promise().query(
    "DELETE FROM informasi_terbaru WHERE id = ?",
    [id]
  );
};
