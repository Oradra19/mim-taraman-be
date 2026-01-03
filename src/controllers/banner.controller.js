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
    const [count] = await Banner.count();

    if (count[0].total >= 5) return res.status(400).json({ message: "Maksimal 5 banner" });
    if (!req.file) return res.status(400).json({ message: "Gambar wajib diupload" });

    const { description } = req.body;
    const imageUrl = req.file.path;
    const publicId = req.file.filename;

    try {
      await Banner.create(imageUrl, description, publicId);
      res.status(201).json({ message: "Banner berhasil ditambahkan", imageUrl });
    } catch (dbErr) {
      await cloudinary.uploader.destroy(req.file.filename);
      res.status(500).json({ message: dbErr.message });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteBanner = async (req, res) => {
  try {
    const [rows] = await Banner.getAll();
    const banner = rows.find((b) => b.id == req.params.id);
    if (!banner) return res.status(404).json({ message: "Banner tidak ditemukan" });

    try {
      await cloudinary.uploader.destroy(`mim/banner/${banner.public_id}`);
    } catch (cloudErr) {}

    await Banner.remove(req.params.id);
    res.json({ message: "Banner berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
