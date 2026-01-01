const Berita = require("../models/berita.model");
const fs = require("fs");
const path = require("path");

exports.getAll = async (req, res) => {
  const [rows] = await Berita.getAll();
  res.json(rows);
};

exports.getDetail = async (req, res) => {
  const [rows] = await Berita.getById(req.params.id);
  res.json(rows[0] || null);
};

exports.create = async (req, res) => {
  if (!req.file)
    return res.status(400).json({ message: "Thumbnail wajib diupload" });

  const data = {
    ...req.body,
    thumbnail: `uploads/berita/${req.file.filename}`
  };

  await Berita.create(data);
  res.status(201).json({ message: "Berita berhasil ditambahkan" });
};

exports.update = async (req, res) => {
  const [rows] = await Berita.getById(req.params.id);
  if (rows.length === 0)
    return res.status(404).json({ message: "Berita tidak ditemukan" });

  let thumbnail = rows[0].thumbnail;

  if (req.file) {
    const oldPath = path.join("public", thumbnail);
    if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    thumbnail = `uploads/berita/${req.file.filename}`;
  }

  await Berita.update(req.params.id, {
    ...req.body,
    thumbnail
  });

  res.json({ message: "Berita berhasil diupdate" });
};

exports.delete = async (req, res) => {
  const [rows] = await Berita.getById(req.params.id);
  if (rows.length === 0)
    return res.status(404).json({ message: "Berita tidak ditemukan" });

  const filePath = path.join("public", rows[0].thumbnail);
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

  await Berita.remove(req.params.id);
  res.json({ message: "Berita dihapus" });
};
