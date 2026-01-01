const Galeri = require("../models/galeriFoto.model");
const fs = require("fs");
const path = require("path");

exports.getAll = async (req, res) => {
  const [rows] = await Galeri.getAll();
  res.json(rows);
};

exports.create = async (req, res) => {
  const imagePath = `uploads/galeri-foto/${req.file.filename}`;
  await Galeri.create(imagePath, req.body.description);
  res.status(201).json({ message: "Foto ditambahkan" });
};

exports.delete = async (req, res) => {
  const [rows] = await Galeri.getAll();
  const data = rows.find(d => d.id == req.params.id);

  const filePath = path.join("public", data.image);
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

  await Galeri.remove(req.params.id);
  res.json({ message: "Foto dihapus" });
};
