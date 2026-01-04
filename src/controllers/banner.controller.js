const Banner = require("../models/banner.model");
const cloudinary = require("../config/cloudinary");

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
    if (!req.file) return res.status(400).json({ message: "File wajib diupload" });

    const { description } = req.body;

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "image" },
        (err, result) => (err ? reject(err) : resolve(result))
      );
      stream.end(req.file.buffer);
    });

    const image = result.secure_url;
    const public_id = result.public_id;

    await Banner.create(image, description, public_id);

    res.status(201).json({ message: "Banner berhasil ditambahkan", image, public_id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

exports.deleteBanner = async (req, res) => {
  try {
    const [rows] = await Banner.getAll();
    const banner = rows.find(b => b.id == req.params.id);
    if (!banner) return res.status(404).json({ message: "Banner tidak ditemukan" });

    await cloudinary.uploader.destroy(banner.public_id);
    await Banner.remove(req.params.id);

    res.json({ message: "Banner berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
