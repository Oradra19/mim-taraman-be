const db = require("../config/db");

exports.get = () => {
  return db.promise().query(
    "SELECT * FROM media_sosial LIMIT 1"
  );
};

exports.save = (data) => {
  const { instagram, facebook, tiktok, youtube, whatsapp } = data;
  return db.promise().query(
    `INSERT INTO media_sosial
    (instagram, facebook, tiktok, youtube, whatsapp)
    VALUES (?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
    instagram=?, facebook=?, tiktok=?, youtube=?, whatsapp=?`,
    [
      instagram, facebook, tiktok, youtube, whatsapp,
      instagram, facebook, tiktok, youtube, whatsapp
    ]
  );
};
