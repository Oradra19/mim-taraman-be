const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");
const controller = require("../controllers/kuesioner.controller");
const multer = require("multer");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});

// PUBLIC
router.get("/", controller.getAll);

// ADMIN
router.post("/", auth, upload.single("image"), controller.create);
router.delete("/:id", auth, controller.delete);

module.exports = router;
