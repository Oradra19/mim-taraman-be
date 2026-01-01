const Informasi = require("../models/informasi.model");
const fs = require("fs");
const path = require("path");

exports.getAll = async (req, res) => {
  const [rows] = await Informasi.getAll();
  res.json(rows);
};

exports.create = async (req, res) => {
  const [count] = await Informasi.count();

  if (count[0].total >= 6) {
    return res.status(400).json({ message: "Maksimal 6 informasi" });
  }

  if (!req.file) {
    return res.status(400).json({ message: "Gambar wajib diupload" });
  }

  const imagePath = `uploads/informasi/${req.file.filename}`;
  await Informasi.create(imagePath, req.body.description);

  res.status(201).json({ message: "Informasi berhasil ditambahkan" });
};

exports.delete = async (req, res) => {
  const [rows] = await Informasi.getAll();
  const data = rows.find((i) => i.id == req.params.id);

  if (!data) {
    return res.status(404).json({ message: "Data tidak ditemukan" });
  }

  const filePath = path.join("public", data.image);
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

  await Informasi.remove(req.params.id);
  res.json({ message: "Informasi dihapus" });
};
