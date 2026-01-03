const Banner = require("../models/banner.model");
const cloudinary = require("cloudinary").v2;

// GET all banners
exports.getBanner = async (req, res) => {
  try {
    const [rows] = await Banner.getAll();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE banner
exports.createBanner = [
  require("../middlewares/upload").single("image"),
  async (req, res) => {
    try {
      if (!req.file) return res.status(400).json({ message: "File wajib diupload" });

      const { description } = req.body;

      // upload ke Cloudinary dari buffer
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "image" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });

      const image = result.secure_url;
      const public_id = result.public_id;

      // cek maksimal banner
      const [countRows] = await Banner.count();
      if (countRows[0].total >= 5) {
        await cloudinary.uploader.destroy(public_id);
        return res.status(400).json({ message: "Maksimal 5 banner" });
      }

      await Banner.create(image, description, public_id);
      res.status(201).json({ message: "Banner berhasil ditambahkan", image });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
];

// DELETE banner
exports.deleteBanner = async (req, res) => {
  try {
    const [rows] = await Banner.getAll();
    const banner = rows.find(b => b.id == req.params.id);
    if (!banner) return res.status(404).json({ message: "Banner tidak ditemukan" });

    try {
      await cloudinary.uploader.destroy(banner.public_id);
    } catch (_) {}

    await Banner.remove(req.params.id);
    res.json({ message: "Banner berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
