const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload")("galeri-foto");
const auth = require("../middlewares/auth.middleware");
const controller = require("../controllers/galeriFoto.controller");

router.get("/", controller.getAll);
router.post("/", auth, upload.single("image"), controller.create);
router.delete("/:id", auth, controller.delete);

module.exports = router;
