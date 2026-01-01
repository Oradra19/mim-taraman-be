const DataSekolah = require("../models/dataSekolah.model");

exports.getData = async (req, res) => {
  const [rows] = await DataSekolah.get();
  res.json(rows[0] || null);
};

exports.saveData = async (req, res) => {
  const [rows] = await DataSekolah.get();

  if (rows.length === 0) {
    await DataSekolah.create(req.body);
  } else {
    await DataSekolah.update(req.body);
  }

  res.json({ message: "Data sekolah berhasil disimpan" });
};
