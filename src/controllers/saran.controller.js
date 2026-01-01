const Saran = require("../models/saran.model");

exports.getAll = async (req, res) => {
  const [rows] = await Saran.getAll();
  res.json(rows);
};

exports.create = async (req, res) => {
  await Saran.create(req.body);
  res.status(201).json({ message: "Saran berhasil dikirim" });
};

exports.delete = async (req, res) => {
  await Saran.remove(req.params.id);
  res.json({ message: "Saran dihapus" });
};
