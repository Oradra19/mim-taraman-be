const db = require("../config/db");

exports.getAll = () => {
  return db.promise().query(
    "SELECT * FROM galeri_video ORDER BY created_at DESC"
  );
};

exports.getById = (id) => {
  return db.promise().query(
    "SELECT * FROM galeri_video WHERE id = ?",
    [id]
  );
};

exports.create = (data) => {
  const { video, public_id, description } = data;
  return db.promise().query(
    "INSERT INTO galeri_video (video, public_id, description) VALUES (?, ?, ?)",
    [video, public_id, description]
  );
};

exports.remove = (id) => {
  return db.promise().query(
    "DELETE FROM galeri_video WHERE id = ?",
    [id]
  );
};
