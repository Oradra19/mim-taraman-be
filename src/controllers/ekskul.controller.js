const Ekskul = require("../models/ekskul.model");
const fs = require("fs");
const path = require("path");

exports.getAll = async (req, res) => {
  const [rows] = await Ekskul.getAll();
  res.json(rows);
};

exports.create = async (req, res) => {
  if (!req.file)
    return res.status(400).json({ message: "Gambar wajib diupload" });

  const imagePath = `uploads/ekskul/${req.file.filename}`;
  await Ekskul.create(imagePath, req.body.description);

  res.status(201).json({ message: "Ekstrakurikuler berhasil ditambahkan" });
};

exports.delete = async (req, res) => {
  const [rows] = await Ekskul.getAll();
  const data = rows.find((e) => e.id == req.params.id);

  if (!data)
    return res.status(404).json({ message: "Data tidak ditemukan" });

  const filePath = path.join("public", data.image);
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

  await Ekskul.remove(req.params.id);
  res.json({ message: "Ekstrakurikuler dihapus" });
};
