const db = require("../config/db");

exports.getAll = () => {
  return db.promise().query(
    "SELECT * FROM kuesioner ORDER BY created_at DESC"
  );
};

exports.create = (data) => {
  const { judul, link, image } = data;
  return db.promise().query(
    "INSERT INTO kuesioner (judul, link, image) VALUES (?, ?, ?)",
    [judul, link, image]
  );
};

exports.remove = (id) => {
  return db.promise().query(
    "DELETE FROM kuesioner WHERE id = ?",
    [id]
  );
};
