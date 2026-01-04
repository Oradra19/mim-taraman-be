const db = require("../config/db");

exports.get = () => {
  return db.promise().query("SELECT * FROM media_sosial LIMIT 1");
};

exports.create = (data) => {
  const { instagram, facebook, tiktok, youtube, whatsapp } = data;

  return db.promise().query(
    `INSERT INTO media_sosial
     (instagram, facebook, tiktok, youtube, whatsapp)
     VALUES (?, ?, ?, ?, ?)`,
    [instagram, facebook, tiktok, youtube, whatsapp]
  );
};

exports.update = (data) => {
  const { instagram, facebook, tiktok, youtube, whatsapp } = data;

  return db.promise().query(
    `UPDATE media_sosial
     SET instagram = ?, facebook = ?, tiktok = ?, youtube = ?, whatsapp = ?
     WHERE id = 1`,
    [instagram, facebook, tiktok, youtube, whatsapp]
  );
};
