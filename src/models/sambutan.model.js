const db = require("../config/db");

exports.get = () => {
  return db.promise().query("SELECT * FROM sambutan LIMIT 1");
};

exports.create = (
  isi,
  link1,
  link2,
  image,
  publicId
) => {
  return db.promise().query(
    `INSERT INTO sambutan
     (isi_sambutan, link_sosmed, link_sosmed2, image, public_id)
     VALUES (?, ?, ?, ?, ?)`,
    [isi, link1, link2, image, publicId]
  );
};

exports.update = (
  isi,
  link1,
  link2,
  image,
  publicId
) => {
  return db.promise().query(
    `UPDATE sambutan SET
     isi_sambutan = ?,
     link_sosmed = ?,
     link_sosmed2 = ?,
     image = ?,
     public_id = ?
     WHERE id = 1`,
    [isi, link1, link2, image, publicId]
  );
};
