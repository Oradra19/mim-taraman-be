const Prestasi = require("../models/prestasi.model");
const fs = require("fs");
const path = require("path");

exports.getAll = async (req, res) => {
  const [rows] = await Prestasi.getAll();
  res.json(rows);
};

exports.create = async (req, res) => {
  if (!req.file)
    return res.status(400).json({ message: "Gambar wajib diupload" });

  const imagePath = `uploads/prestasi/${req.file.filename}`;
  await Prestasi.create(imagePath, req.body.description);

  res.status(201).json({ message: "Prestasi berhasil ditambahkan" });
};

exports.delete = async (req, res) => {
  const [rows] = await Prestasi.getAll();
  const data = rows.find((p) => p.id == req.params.id);

  if (!data)
    return res.status(404).json({ message: "Data tidak ditemukan" });

  const filePath = path.join("public", data.image);
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

  await Prestasi.remove(req.params.id);
  res.json({ message: "Prestasi dihapus" });
};
