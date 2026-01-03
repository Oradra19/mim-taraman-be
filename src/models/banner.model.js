const db = require("../config/db");

exports.getAll = () => {
  return db
    .promise()
    .query("SELECT * FROM banners WHERE type='banner' ORDER BY created_at DESC");
};

exports.count = () => {
  return db
    .promise()
    .query("SELECT COUNT(*) AS total FROM banners WHERE type='banner'");
};

exports.create = (image, description, publicId) => {
  return db
    .promise()
    .query(
      "INSERT INTO banners (image, description, public_id, type) VALUES (?, ?, ?, 'banner')",
      [image, description, publicId]
    );
};

exports.remove = (id) => {
  return db.promise().query("DELETE FROM banners WHERE id = ?", [id]);
};
