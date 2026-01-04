const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");
const uploadVideo = require("../middlewares/uploadVideo");
const controller = require("../controllers/galeriVideo.controller");

// PUBLIC
router.get("/", controller.getAll);

// ADMIN
router.post("/", auth, uploadVideo.single("video"), controller.create);
router.delete("/:id", auth, controller.delete);

module.exports = router;
