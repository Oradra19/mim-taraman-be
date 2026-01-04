const Media = require("../models/mediaSosial.model");

exports.getData = async (req, res) => {
  try {
    const [rows] = await Media.get();
    res.json(rows[0] || null);
  } catch (err) {
    res.status(500).json({ message: "Gagal mengambil media sosial" });
  }
};

exports.createData = async (req, res) => {
  try {
    const [rows] = await Media.get();
    if (rows.length > 0) {
      return res
        .status(400)
        .json({ message: "Media sosial sudah ada, gunakan edit" });
    }

    await Media.create(req.body);
    res.json({ message: "Media sosial berhasil dibuat" });
  } catch (err) {
    res.status(500).json({ message: "Gagal membuat media sosial" });
  }
};

exports.editData = async (req, res) => {
  try {
    await Media.update(req.body);
    res.json({ message: "Media sosial berhasil diperbarui" });
  } catch (err) {
    res.status(500).json({ message: "Gagal mengedit media sosial" });
  }
};
