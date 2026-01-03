const Banner = require("../models/banner.model");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

// CREATE banner (ADMIN)
exports.createBanner = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "File wajib diupload" });

    const { description } = req.body;

    // Upload ke Cloudinary
    const uploaded = await cloudinary.uploader.upload(req.file.path, {
      folder: "image",
      transformation: [{ width: 1000, height: 1000, crop: "limit" }],
    });

    // Ambil URL + public_id
    const imageUrl = uploaded.secure_url;
    const publicId = uploaded.public_id;

    // Simpan ke DB
    await Banner.create(imageUrl, description, publicId);

    // Hapus file sementara dari server
    try { fs.unlinkSync(req.file.path); } catch (_) {}

    res.status(201).json({ message: "Banner berhasil ditambahkan", image: imageUrl });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET all banners (PUBLIC)
exports.getBanner = async (req, res) => {
  try {
    const [rows] = await Banner.getAll();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE banner (ADMIN)
exports.deleteBanner = async (req, res) => {
  try {
    const [rows] = await Banner.getAll();
    const banner = rows.find(b => b.id == req.params.id);

    if (!banner) return res.status(404).json({ message: "Banner tidak ditemukan" });

    // Hapus dari Cloudinary
    try { await cloudinary.uploader.destroy(banner.public_id); } catch (_) {}

    // Hapus dari DB
    await Banner.remove(req.params.id);

    res.json({ message: "Banner berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
