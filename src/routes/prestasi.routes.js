const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload")("prestasi");
const auth = require("../middlewares/auth.middleware");
const controller = require("../controllers/prestasi.controller");

// PUBLIC
router.get("/", controller.getAll);

// ADMIN
router.post("/", auth, upload.single("image"), controller.create);
router.delete("/:id", auth, controller.delete);

module.exports = router;
