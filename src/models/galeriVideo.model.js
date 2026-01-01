const db = require("../config/db");

exports.getAll = () => {
  return db.promise().query("SELECT * FROM galeri_video ORDER BY created_at DESC");
};

exports.create = (video, description) => {
  return db.promise().query(
    "INSERT INTO galeri_video (video, description) VALUES (?, ?)",
    [video, description]
  );
};

exports.remove = (id) => {
  return db.promise().query(
    "DELETE FROM galeri_video WHERE id = ?",
    [id]
  );
};
