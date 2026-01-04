const Berita = require("../models/berita.model");
const cloudinary = require("../config/cloudinary");

exports.getAll = async (req, res) => {
  try {
    const [rows] = await Berita.getAll();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getDetail = async (req, res) => {
  try {
    const [rows] = await Berita.getById(req.params.id);
    res.json(rows[0] || null);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "Thumbnail wajib diupload" });

    const { kategori, judul, penulis, sambutan, isi } = req.body;

    // upload ke Cloudinary
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "image" },
        (err, result) => (err ? reject(err) : resolve(result))
      );
      stream.end(req.file.buffer);
    });

    const data = {
      kategori,
      judul,
      penulis,
      thumbnail: result.secure_url,
      public_id: result.public_id,
      sambutan,
      isi,
    };

    await Berita.create(data);
    res.status(201).json({ message: "Berita berhasil ditambahkan", data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const [rows] = await Berita.getById(req.params.id);
    if (!rows.length) return res.status(404).json({ message: "Berita tidak ditemukan" });

    let thumbnail = rows[0].thumbnail;
    let public_id = rows[0].public_id;

    if (req.file) {
      // hapus thumbnail lama dari Cloudinary
      try { await cloudinary.uploader.destroy(public_id); } catch (_) {}

      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "image" },
          (err, result) => (err ? reject(err) : resolve(result))
        );
        stream.end(req.file.buffer);
      });

      thumbnail = result.secure_url;
      public_id = result.public_id;
    }

    const { kategori, judul, penulis, sambutan, isi } = req.body;

    await Berita.update(req.params.id, {
      kategori,
      judul,
      penulis,
      thumbnail,
      public_id,
      sambutan,
      isi,
    });

    res.json({ message: "Berita berhasil diupdate" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const [rows] = await Berita.getById(req.params.id);
    if (!rows.length) return res.status(404).json({ message: "Berita tidak ditemukan" });

    // hapus thumbnail dari Cloudinary
    try { await cloudinary.uploader.destroy(rows[0].public_id); } catch (_) {}

    await Berita.remove(req.params.id);
    res.json({ message: "Berita berhasil dihapus" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
