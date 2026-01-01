const Banner = require("../models/banner.model");
const fs = require("fs");
const path = require("path");

// GET BANNER (PUBLIC)
exports.getBanner = async (req, res) => {
  const [rows] = await Banner.getAll();
  res.json(rows);
};

// CREATE BANNER (ADMIN)
exports.createBanner = async (req, res) => {
  try {
    const [count] = await Banner.count();

    if (count[0].total >= 5) {
      return res
        .status(400)
        .json({ message: "Maksimal 5 banner" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Gambar wajib diupload" });
    }

    const imagePath = `uploads/banner/${req.file.filename}`;
    const { description } = req.body;

    await Banner.create(imagePath, description);

    res.status(201).json({ message: "Banner berhasil ditambahkan" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE BANNER (ADMIN)
exports.deleteBanner = async (req, res) => {
  try {
    const [rows] = await Banner.getAll();
    const banner = rows.find((b) => b.id == req.params.id);

    if (!banner) {
      return res.status(404).json({ message: "Banner tidak ditemukan" });
    }

    // hapus file
    const filePath = path.join("public", banner.image);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    await Banner.remove(req.params.id);

    res.json({ message: "Banner berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
