const db = require("../config/db");

exports.get = () => {
  return db.promise().query("SELECT * FROM data_sekolah LIMIT 1");
};

exports.create = (data) => {
  const { siswa, guru, tenaga, alumni } = data;
  return db.promise().query(
    `INSERT INTO data_sekolah 
    (jumlah_siswa, jumlah_guru, jumlah_tendik, jumlah_alumni)
    VALUES (?, ?, ?, ?)`,
    [siswa, guru, tenaga, alumni]
  );
};

exports.update = (data) => {
  const { siswa, guru, tenaga, alumni } = data;
  return db.promise().query(
    `UPDATE data_sekolah SET
    jumlah_siswa = ?,
    jumlah_guru = ?,
    jumlah_tendik = ?,
    jumlah_alumni = ?
    WHERE id = 1`,
    [siswa, guru, tenaga, alumni]
  );
};
