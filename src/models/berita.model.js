const db = require("../config/db");

exports.getAll = () => {
  return db.promise().query(
    "SELECT * FROM berita ORDER BY created_at DESC"
  );
};

exports.getById = (id) => {
  return db.promise().query(
    "SELECT * FROM berita WHERE id = ?",
    [id]
  );
};

exports.create = (data) => {
  const { kategori, judul, penulis, thumbnail, sambutan, isi } = data;
  return db.promise().query(
    `INSERT INTO berita 
    (kategori, judul, penulis, thumbnail, sambutan, isi)
    VALUES (?, ?, ?, ?, ?, ?)`,
    [kategori, judul, penulis, thumbnail, sambutan, isi]
  );
};

exports.update = (id, data) => {
  const { kategori, judul, penulis, thumbnail, sambutan, isi } = data;
  return db.promise().query(
    `UPDATE berita SET
      kategori = ?, judul = ?, penulis = ?, 
      thumbnail = ?, sambutan = ?, isi = ?
     WHERE id = ?`,
    [kategori, judul, penulis, thumbnail, sambutan, isi, id]
  );
};

exports.remove = (id) => {
  return db.promise().query(
    "DELETE FROM berita WHERE id = ?",
    [id]
  );
};
