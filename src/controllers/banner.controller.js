const Banner = require("../models/banner.model");
const cloudinary = require("cloudinary").v2;

exports.getBanner = async (req, res) => {
  try {
    const [rows] = await Banner.getAll();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createBanner = async (req, res) => {
  try {
    const { imageUrl, publicId, description } = req.body;

    if (!imageUrl || !publicId) {
      return res.status(400).json({ message: "imageUrl & publicId wajib" });
    }

    await Banner.create(imageUrl, description, publicId);
    res.status(201).json({ message: "Banner berhasil ditambahkan", imageUrl });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteBanner = async (req, res) => {
  try {
    const [rows] = await Banner.getAll();
    const banner = rows.find(b => b.id == req.params.id);
    if (!banner) return res.status(404).json({ message: "Banner tidak ditemukan" });

    // hapus dari Cloudinary pakai public_id
    try { await cloudinary.uploader.destroy(banner.public_id); } catch (_) {}

    await Banner.remove(req.params.id);
    res.json({ message: "Banner berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
