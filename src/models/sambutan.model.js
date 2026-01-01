const db = require("../config/db");

exports.get = () => {
  return db.promise().query("SELECT * FROM sambutan LIMIT 1");
};

exports.create = (isi, link) => {
  return db
    .promise()
    .query(
      "INSERT INTO sambutan (isi_sambutan, link_sosmed) VALUES (?, ?)",
      [isi, link]
    );
};

exports.update = (isi, link) => {
  return db
    .promise()
    .query(
      "UPDATE sambutan SET isi_sambutan = ?, link_sosmed = ? WHERE id = 1",
      [isi, link]
    );
};
