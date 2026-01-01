const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload")("kuesioner");
const auth = require("../middlewares/auth.middleware");
const controller = require("../controllers/kuesioner.controller");

// PUBLIC
router.get("/", controller.getAll);

// ADMIN
router.post("/", auth, upload.single("image"), controller.create);
router.delete("/:id", auth, controller.delete);

module.exports = router;
