const db = require("../config/db");

exports.getAll = () => {
  return db
    .promise()
    .query("SELECT * FROM banners ORDER BY created_at DESC");
};

exports.count = () => {
  return db
    .promise()
    .query("SELECT COUNT(*) AS total FROM banners");
};

exports.create = (image, description, publicId) => {
  return db
    .promise()
    .query(
      "INSERT INTO banners (image, public_id, description) VALUES (?, ?, ?)",
      [image, publicId, description]
    );
};

exports.remove = (id) => {
  return db.promise().query("DELETE FROM banners WHERE id = ?", [id]);
};
