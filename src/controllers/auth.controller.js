const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../models/admin.model");

// REGISTER ADMIN
exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Username & password wajib diisi" });
    }

    const [existing] = await Admin.findByUsername(username);
    if (existing.length > 0) {
      return res.status(400).json({ message: "Username sudah digunakan" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await Admin.createAdmin(username, hashedPassword);

    res.status(201).json({ message: "Admin berhasil dibuat" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// LOGIN ADMIN
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const [rows] = await Admin.findByUsername(username);
    if (rows.length === 0) {
      return res.status(401).json({ message: "Username atau password salah" });
    }

    const admin = rows[0];
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Username atau password salah" });
    }

    const token = jwt.sign(
      { id: admin.id, username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login berhasil",
      token,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
