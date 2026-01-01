const db = require("../config/db");

exports.getAll = () => {
  return db.promise().query(
    "SELECT * FROM saran ORDER BY created_at DESC"
  );
};

exports.create = (data) => {
  const { nama, whatsapp, email, topik, pesan } = data;
  return db.promise().query(
    `INSERT INTO saran 
    (nama, whatsapp, email, topik, pesan)
    VALUES (?, ?, ?, ?, ?)`,
    [nama, whatsapp, email, topik, pesan]
  );
};

exports.remove = (id) => {
  return db.promise().query(
    "DELETE FROM saran WHERE id = ?",
    [id]
  );
};
