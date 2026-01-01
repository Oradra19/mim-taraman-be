const Sambutan = require("../models/sambutan.model");

exports.getSambutan = async (req, res) => {
  const [rows] = await Sambutan.get();
  res.json(rows[0] || null);
};

exports.saveSambutan = async (req, res) => {
  const { isi_sambutan, link_sosmed } = req.body;
  const [rows] = await Sambutan.get();

  if (rows.length === 0) {
    await Sambutan.create(isi_sambutan, link_sosmed);
  } else {
    await Sambutan.update(isi_sambutan, link_sosmed);
  }

  res.json({ message: "Sambutan berhasil disimpan" });
};
