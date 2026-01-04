const Ekskul = require("../models/ekskul.model");
const cloudinary = require("cloudinary").v2;

exports.getAll = async (req, res) => {
  try {
    const [rows] = await Ekskul.getAll();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "Gambar wajib diupload" });

    const buffer = req.file.buffer; // multer harus pakai memory storage
    const description = req.body.description;

    const result = await cloudinary.uploader.upload_stream(
      { folder: "image" },
      async (error, uploadResult) => {
        if (error) return res.status(500).json({ message: error.message });

        await Ekskul.create(uploadResult.secure_url, uploadResult.public_id, description);
        res.status(201).json({ message: "Ekstrakurikuler berhasil ditambahkan", image: uploadResult.secure_url });
      }
    );

    result.end(buffer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const [rows] = await Ekskul.getAll();
    const data = rows.find((e) => e.id == req.params.id);
    if (!data) return res.status(404).json({ message: "Data tidak ditemukan" });

    try { await cloudinary.uploader.destroy(data.public_id); } catch (_) {}

    await Ekskul.remove(req.params.id);
    res.json({ message: "Ekstrakurikuler dihapus" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
