const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload")("galeri-video");
const auth = require("../middlewares/auth.middleware");
const controller = require("../controllers/galeriVideo.controller");

router.get("/", controller.getAll);
router.post("/", auth, upload.single("video"), controller.create);
router.delete("/:id", auth, controller.delete);

module.exports = router;
