const db = require("../config/db");

exports.getAll = () => {
  return db
    .promise()
    .query("SELECT * FROM banners WHERE type='iklan' ORDER BY created_at DESC");
};

exports.create = (image, description) => {
  return db.promise().query(
    "INSERT INTO banners (image, description, type) VALUES (?, ?, 'iklan')",
    [image, description]
  );
};

exports.remove = (id) => {
  return db.promise().query("DELETE FROM banners WHERE id = ?", [id]);
};
