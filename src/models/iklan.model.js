const db = require("../config/db");

exports.getAll = () => {
  return db.promise().query(
    "SELECT * FROM banners WHERE type = 'iklan' ORDER BY created_at DESC"
  );
};

exports.getById = (id) => {
  return db.promise().query(
    "SELECT * FROM banners WHERE id = ? AND type = 'iklan'",
    [id]
  );
};

exports.create = (data) => {
  const { image, public_id, description } = data;
  return db.promise().query(
    "INSERT INTO banners (image, public_id, description, type) VALUES (?, ?, ?, 'iklan')",
    [image, public_id, description]
  );
};

exports.remove = (id) => {
  return db.promise().query(
    "DELETE FROM banners WHERE id = ? AND type = 'iklan'",
    [id]
  );
};
