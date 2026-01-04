const db = require("../config/db");

exports.getAll = () => {
  return db.promise().query("SELECT * FROM galeri_foto ORDER BY created_at DESC");
};

exports.create = (image, public_id, description) => {
  return db.promise().query(
    "INSERT INTO galeri_foto (image, public_id, description) VALUES (?, ?, ?)",
    [image, public_id, description]
  );
};

exports.remove = (id) => {
  return db.promise().query(
    "DELETE FROM galeri_foto WHERE id = ?",
    [id]
  );
};
