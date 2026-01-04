const Informasi = require("../models/informasi.model");
const cloudinary = require("cloudinary").v2;

exports.getAll = async (req, res) => {
  try {
    const [rows] = await Informasi.getAll();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const [count] = await Informasi.count();
    if (count[0].total >= 6) {
      return res.status(400).json({ message: "Maksimal 6 informasi" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Gambar wajib diupload" });
    }

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "image" },
        (err, result) => (err ? reject(err) : resolve(result))
      );
      stream.end(req.file.buffer);
    });

    await Informasi.create({
      image: result.secure_url,
      public_id: result.public_id,
      description: req.body.description,
    });

    res.status(201).json({ message: "Informasi berhasil ditambahkan" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const [rows] = await Informasi.getAll();
    const data = rows.find((i) => i.id == req.params.id);

    if (!data)
      return res.status(404).json({ message: "Data tidak ditemukan" });

    let image = data.image;
    let public_id = data.public_id;

    if (req.file) {
      // hapus gambar lama
      try {
        await cloudinary.uploader.destroy(public_id);
      } catch (_) {}

      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "image" },
          (err, result) => (err ? reject(err) : resolve(result))
        );
        stream.end(req.file.buffer);
      });

      image = result.secure_url;
      public_id = result.public_id;
    }

    await Informasi.update(req.params.id, {
      image,
      public_id,
      description: req.body.description,
    });

    res.json({ message: "Informasi berhasil diperbarui" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const [rows] = await Informasi.getAll();
    const data = rows.find((i) => i.id == req.params.id);

    if (!data)
      return res.status(404).json({ message: "Data tidak ditemukan" });

    try {
      await cloudinary.uploader.destroy(data.public_id);
    } catch (_) {}

    await Informasi.remove(req.params.id);
    res.json({ message: "Informasi dihapus" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
