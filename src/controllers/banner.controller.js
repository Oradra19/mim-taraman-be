const Banner = require("../models/banner.model");
const cloudinary = require("cloudinary").v2;

// GET all banners (PUBLIC)
exports.getBanner = async (req, res) => {
  try {
    const [rows] = await Banner.getAll();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE banner (ADMIN)
exports.createBanner = async (req, res) => {
  try {
    const { image, public_id, description } = req.body;

    if (!image || !public_id) {
      return res.status(400).json({ message: "image & public_id wajib" });
    }

    // cek maksimal banner
    const [countRows] = await Banner.count();
    if (countRows[0].total >= 5) {
      return res.status(400).json({ message: "Maksimal 5 banner" });
    }

    await Banner.create(image, description, public_id);
    res.status(201).json({ message: "Banner berhasil ditambahkan", image });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE banner (ADMIN)
exports.deleteBanner = async (req, res) => {
  try {
    const [rows] = await Banner.getAll();
    const banner = rows.find(b => b.id == req.params.id);

    if (!banner) {
      return res.status(404).json({ message: "Banner tidak ditemukan" });
    }

    // hapus dari Cloudinary
    try { 
      await cloudinary.uploader.destroy(banner.public_id); 
    } catch (_) {}

    await Banner.remove(req.params.id);
    res.json({ message: "Banner berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
