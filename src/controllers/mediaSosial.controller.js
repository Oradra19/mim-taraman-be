const Media = require("../models/mediaSosial.model");

exports.getData = async (req, res) => {
  const [rows] = await Media.get();
  res.json(rows[0] || null);
};

exports.saveData = async (req, res) => {
  await Media.save(req.body);
  res.json({ message: "Media sosial disimpan" });
};
