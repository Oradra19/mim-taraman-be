const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");
const controller = require("../controllers/sambutan.controller");

// PUBLIC
router.get("/", controller.getSambutan);

// ADMIN
router.post("/", auth, controller.saveSambutan);

module.exports = router;
