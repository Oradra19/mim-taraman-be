const Iklan = require("../models/iklan.model");
const fs = require("fs");
const path = require("path");

exports.getAll = async (req, res) => {
  const [rows] = await Iklan.getAll();
  res.json(rows);
};

exports.create = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Gambar wajib diupload" });
  }

  const imagePath = `uploads/iklan/${req.file.filename}`;
  await Iklan.create(imagePath, req.body.description);

  res.status(201).json({ message: "Iklan berhasil ditambahkan" });
};

exports.delete = async (req, res) => {
  const [rows] = await Iklan.getAll();
  const data = rows.find((i) => i.id == req.params.id);

  if (!data) {
    return res.status(404).json({ message: "Iklan tidak ditemukan" });
  }

  const filePath = path.join("public", data.image);
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

  await Iklan.remove(req.params.id);
  res.json({ message: "Iklan dihapus" });
};
