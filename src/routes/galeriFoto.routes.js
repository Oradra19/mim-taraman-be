const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");
const controller = require("../controllers/galeriFoto.controller");
const multer = require("multer");

const storage = multer.memoryStorage(); // pakai memory untuk Cloudinary upload
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

// PUBLIC
router.get("/", controller.getAll);

// ADMIN
router.post("/", auth, upload.single("image"), controller.create);
router.delete("/:id", auth, controller.delete);

module.exports = router;
