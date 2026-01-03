const express = require("express");
const router = express.Router();
const upload = require("../upload");
const auth = require("../middlewares/auth.middleware");
const controller = require("../controllers/banner.controller");

router.get("/", controller.getBanner);
router.post("/", auth, upload.single("image"), controller.createBanner);
router.delete("/:id", auth, controller.deleteBanner);

module.exports = router;
