const DataSekolah = require("../models/dataSekolah.model");

exports.getData = async (req, res) => {
  try {
    const [rows] = await DataSekolah.get();
    res.json(rows[0] || null);
  } catch (err) {
    res.status(500).json({ message: "Gagal mengambil data sekolah" });
  }
};

exports.createData = async (req, res) => {
  try {
    const [rows] = await DataSekolah.get();
    if (rows.length > 0) {
      return res
        .status(400)
        .json({ message: "Data sekolah sudah ada, gunakan edit" });
    }

    await DataSekolah.create(req.body);
    res.json({ message: "Data sekolah berhasil dibuat" });
  } catch (err) {
    res.status(500).json({ message: "Gagal membuat data sekolah" });
  }
};

exports.editData = async (req, res) => {
  try {
    await DataSekolah.update(req.body);
    res.json({ message: "Data sekolah berhasil diperbarui" });
  } catch (err) {
    res.status(500).json({ message: "Gagal mengedit data sekolah" });
  }
};
