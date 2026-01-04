const Kuesioner = require("../models/kuesioner.model");
const cloudinary = require("cloudinary").v2;

exports.getAll = async (req, res) => {
  try {
    const [rows] = await Kuesioner.getAll();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ message: "Gambar wajib diupload" });

    const { judul, link } = req.body;

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "image" },
        (err, result) => (err ? reject(err) : resolve(result))
      );
      stream.end(req.file.buffer);
    });

    await Kuesioner.create({
      judul,
      link,
      image: result.secure_url,
      public_id: result.public_id,
    });

    res.status(201).json({
      message: "Kuesioner ditambahkan",
      image: result.secure_url,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const [rows] = await Kuesioner.getAll();
    const data = rows.find((k) => k.id == req.params.id);

    if (!data)
      return res.status(404).json({ message: "Data tidak ditemukan" });

    try {
      await cloudinary.uploader.destroy(data.public_id);
    } catch (_) {}

    await Kuesioner.remove(req.params.id);

    res.json({ message: "Kuesioner dihapus" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
