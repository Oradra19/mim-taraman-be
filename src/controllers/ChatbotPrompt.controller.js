const ChatbotPrompt = require("../models/ChatbotPrompt.model");

// GET ALL (ADMIN)
exports.getAll = async (req, res) => {
  try {
    const data = await ChatbotPrompt.getAll();
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// CREATE
exports.create = async (req, res) => {
  try {
    const { role, title, content } = req.body;
    await ChatbotPrompt.create({ role, title, content });
    res.json({ success: true, message: "Prompt ditambahkan" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// UPDATE
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { role, title, content } = req.body;
    await ChatbotPrompt.update(id, { role, title, content });
    res.json({ success: true, message: "Prompt diperbarui" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// DELETE (SOFT)
exports.deactivate = async (req, res) => {
  try {
    const { id } = req.params;
    await ChatbotPrompt.deactivate(id);
    res.json({ success: true, message: "Prompt dinonaktifkan" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};


// GET ACTIVE PROMPT (PUBLIC - untuk chatbot)
exports.getPublic = async (req, res) => {
  try {
    const data = await ChatbotPrompt.getPublic();
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
