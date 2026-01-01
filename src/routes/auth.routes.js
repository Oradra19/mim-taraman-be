const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/profile", authMiddleware, (req, res) => {
  res.json({
    message: "Ini data admin",
    admin: req.admin,
  });
});

router.post("/register", authController.register);
router.post("/login", authController.login);

module.exports = router;
