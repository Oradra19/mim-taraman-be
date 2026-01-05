const Sambutan = require("../models/sambutan.model");
const cloudinary = require("cloudinary").v2;

// =====================
// GET (PUBLIC)
// =====================
exports.getSambutan = async (req, res) => {
  try {
    const [rows] = await Sambutan.get();
    res.json(rows[0] || null);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// =====================
// CREATE (ADMIN)
// =====================
exports.createSambutan = async (req, res) => {
  try {
    const { isi_sambutan, link_sosmed, link_sosmed2 } = req.body;

    const [rows] = await Sambutan.get();
    if (rows.length > 0) {
      return res.status(400).json({ message: "Sambutan sudah ada" });
    }

    // 👉 kalau TIDAK upload gambar
    if (!req.file) {
      await Sambutan.create(isi_sambutan, link_sosmed, link_sosmed2, null, null);
      return res.status(201).json({ message: "Sambutan berhasil dibuat" });
    }

    // 👉 kalau ADA upload gambar (SAMAKAN DENGAN PRESTASI)
    const buffer = req.file.buffer;

    const stream = cloudinary.uploader.upload_stream(
      { folder: "sambutan" },
      async (error, uploadResult) => {
        if (error) return res.status(500).json({ message: error.message });

        await Sambutan.create(
          isi_sambutan,
          link_sosmed,
          link_sosmed2,
          uploadResult.secure_url,
          uploadResult.public_id
        );

        res.status(201).json({
          message: "Sambutan berhasil dibuat",
          image: uploadResult.secure_url,
        });
      }
    );

    stream.end(buffer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// =====================
// EDIT (ADMIN)
// =====================
exports.editSambutan = async (req, res) => {
  try {
    const { isi_sambutan, link_sosmed, link_sosmed2 } = req.body;

    const [rows] = await Sambutan.get();
    if (rows.length === 0) {
      return res.status(404).json({ message: "Sambutan belum ada" });
    }

    const data = rows[0];

    // 👉 kalau TIDAK upload gambar baru
    if (!req.file) {
      await Sambutan.update(
        isi_sambutan,
        link_sosmed,
        link_sosmed2,
        data.image,
        data.public_id
      );
      return res.json({ message: "Sambutan berhasil diperbarui" });
    }

    // 👉 kalau upload gambar baru
    try {
      if (data.public_id) {
        await cloudinary.uploader.destroy(data.public_id);
      }
    } catch (_) {}

    const buffer = req.file.buffer;

    const stream = cloudinary.uploader.upload_stream(
      { folder: "image" },
      async (error, uploadResult) => {
        if (error) return res.status(500).json({ message: error.message });

        await Sambutan.update(
          isi_sambutan,
          link_sosmed,
          link_sosmed2,
          uploadResult.secure_url,
          uploadResult.public_id
        );

        res.json({
          message: "Sambutan berhasil diperbarui",
          image: uploadResult.secure_url,
        });
      }
    );

    stream.end(buffer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
