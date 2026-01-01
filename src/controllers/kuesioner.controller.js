const Kuesioner = require("../models/kuesioner.model");
const fs = require("fs");
const path = require("path");

exports.getAll = async (req, res) => {
  const [rows] = await Kuesioner.getAll();
  res.json(rows);
};

exports.create = async (req, res) => {
  if (!req.file)
    return res.status(400).json({ message: "Gambar wajib diupload" });

  const data = {
    judul: req.body.judul,
    link: req.body.link,
    image: `uploads/kuesioner/${req.file.filename}`
  };

  await Kuesioner.create(data);
  res.status(201).json({ message: "Kuesioner ditambahkan" });
};

exports.delete = async (req, res) => {
  const [rows] = await Kuesioner.getAll();
  const data = rows.find((k) => k.id == req.params.id);

  if (!data)
    return res.status(404).json({ message: "Data tidak ditemukan" });

  const filePath = path.join("public", data.image);
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

  await Kuesioner.remove(req.params.id);
  res.json({ message: "Kuesioner dihapus" });
};
