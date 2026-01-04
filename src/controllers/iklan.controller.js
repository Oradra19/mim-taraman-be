const Iklan = require("../models/iklan.model");
const cloudinary = require("cloudinary").v2;

exports.getAll = async (req, res) => {
  try {
    const [rows] = await Iklan.getAll();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ message: "Gambar wajib diupload" });

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "image" },
        (err, result) => (err ? reject(err) : resolve(result))
      );
      stream.end(req.file.buffer);
    });

    await Iklan.create({
      image: result.secure_url,
      public_id: result.public_id,
      description: req.body.description,
    });

    res.status(201).json({ message: "Iklan berhasil ditambahkan" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const [rows] = await Iklan.getById(req.params.id);
    if (rows.length === 0)
      return res.status(404).json({ message: "Iklan tidak ditemukan" });

    const data = rows[0];

    try {
      await cloudinary.uploader.destroy(data.public_id);
    } catch (_) {}

    await Iklan.remove(req.params.id);
    res.json({ message: "Iklan dihapus" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
