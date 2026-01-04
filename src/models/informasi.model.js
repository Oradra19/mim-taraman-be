const db = require("../config/db");

exports.getAll = () => {
  return db.promise().query(
    "SELECT * FROM informasi_terbaru ORDER BY created_at DESC"
  );
};

exports.count = () => {
  return db.promise().query(
    "SELECT COUNT(*) AS total FROM informasi_terbaru"
  );
};

exports.create = (data) => {
  const { image, public_id, description } = data;
  return db.promise().query(
    "INSERT INTO informasi_terbaru (image, public_id, description) VALUES (?, ?, ?)",
    [image, public_id, description]
  );
};

exports.update = (id, data) => {
  const { image, public_id, description } = data;
  return db.promise().query(
    "UPDATE informasi_terbaru SET image = ?, public_id = ?, description = ? WHERE id = ?",
    [image, public_id, description, id]
  );
};

exports.remove = (id) => {
  return db.promise().query(
    "DELETE FROM informasi_terbaru WHERE id = ?",
    [id]
  );
};
