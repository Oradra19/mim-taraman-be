const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const auth = require("../middlewares/auth.middleware");
const controller = require("../controllers/berita.controller");

// PUBLIC
router.get("/", controller.getAll);
router.get("/:id", controller.getDetail);

// ADMIN
router.post("/", auth, upload.single("thumbnail"), controller.create);
router.put("/:id", auth, upload.single("thumbnail"), controller.update);
router.delete("/:id", auth, controller.delete);

module.exports = router;
