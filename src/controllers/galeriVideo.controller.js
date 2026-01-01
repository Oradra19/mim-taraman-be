const Galeri = require("../models/galeriVideo.model");
const fs = require("fs");
const path = require("path");

exports.getAll = async (req, res) => {
  const [rows] = await Galeri.getAll();
  res.json(rows);
};

exports.create = async (req, res) => {
  const videoPath = `uploads/galeri-video/${req.file.filename}`;
  await Galeri.create(videoPath, req.body.description);
  res.status(201).json({ message: "Video ditambahkan" });
};

exports.delete = async (req, res) => {
  const [rows] = await Galeri.getAll();
  const data = rows.find(d => d.id == req.params.id);

  const filePath = path.join("public", data.video);
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

  await Galeri.remove(req.params.id);
  res.json({ message: "Video dihapus" });
};
