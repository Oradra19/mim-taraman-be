const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");
const upload = require("../middlewares/upload");
const controller = require("../controllers/banner.controller");

// PUBLIC
router.get("/", controller.getBanner);

// ADMIN
router.post("/", auth, upload.single("image"), controller.createBanner);
router.delete("/:id", auth, controller.deleteBanner);

module.exports = router;
