const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");
const controller = require("../controllers/sambutan.controller");
const multer = require("multer");

const storage = multer.memoryStorage(); // pakai memory untuk Cloudinary upload
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

router.get("/", controller.getSambutan);

router.post("/", auth, upload.single("image"), controller.createSambutan);
router.put("/", auth, upload.single("image"), controller.editSambutan);
module.exports = router;
