const Galeri = require("../models/galeriVideo.model");
const cloudinary = require("cloudinary").v2;

exports.getAll = async (req, res) => {
  try {
    const [rows] = await Galeri.getAll();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ message: "Video wajib diupload" });

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "galeri-video",
          resource_type: "video",
        },
        (err, result) => (err ? reject(err) : resolve(result))
      );
      stream.end(req.file.buffer);
    });

    await Galeri.create({
      video: result.secure_url,
      public_id: result.public_id,
      description: req.body.description,
    });

    res.status(201).json({ message: "Video berhasil ditambahkan" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const [rows] = await Galeri.getById(req.params.id);
    if (rows.length === 0)
      return res.status(404).json({ message: "Video tidak ditemukan" });

    const data = rows[0];

    try {
      await cloudinary.uploader.destroy(data.public_id, {
        resource_type: "video",
      });
    } catch (_) {}

    await Galeri.remove(req.params.id);
    res.json({ message: "Video dihapus" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
