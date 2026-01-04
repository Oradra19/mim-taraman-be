const Sambutan = require("../models/sambutan.model");

exports.getSambutan = async (req, res) => {
  try {
    const [rows] = await Sambutan.get();
    res.json(rows[0] || null);
  } catch (err) {
    res.status(500).json({ message: "Gagal mengambil sambutan" });
  }
};

exports.createSambutan = async (req, res) => {
  try {
    const { isi_sambutan, link_sosmed } = req.body;

    const [rows] = await Sambutan.get();
    if (rows.length > 0) {
      return res
        .status(400)
        .json({ message: "Sambutan sudah ada, gunakan edit" });
    }

    await Sambutan.create(isi_sambutan, link_sosmed);
    res.json({ message: "Sambutan berhasil dibuat" });
  } catch (err) {
    res.status(500).json({ message: "Gagal membuat sambutan" });
  }
};

exports.editSambutan = async (req, res) => {
  try {
    const { isi_sambutan, link_sosmed } = req.body;

    await Sambutan.update(isi_sambutan, link_sosmed);
    res.json({ message: "Sambutan berhasil diperbarui" });
  } catch (err) {
    res.status(500).json({ message: "Gagal mengedit sambutan" });
  }
};
