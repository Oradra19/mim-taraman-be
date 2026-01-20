const ChatbotPrompt = require("../models/ChatbotPrompt.model");

// GET ALL (ADMIN)
exports.getAll = async (req, res) => {
  try {
    const [rows] = await ChatbotPrompt.getAll();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE
exports.create = async (req, res) => {
  try {
    const { role, title, content } = req.body;
    await ChatbotPrompt.create({ role, title, content });
    res.status(201).json({ message: "Prompt ditambahkan" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { role, title, content } = req.body;
    await ChatbotPrompt.update(id, { role, title, content });
    res.json({ message: "Prompt diperbarui" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// HARD DELETE
exports.delete = async (req, res) => {
  try {
    await ChatbotPrompt.delete(req.params.id);
    res.json({ message: "Prompt dihapus permanen" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ACTIVE PROMPT (PUBLIC)
exports.getPublic = async (req, res) => {
  try {
    const [rows] = await ChatbotPrompt.getPublic();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
