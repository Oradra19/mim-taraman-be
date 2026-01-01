const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");
const controller = require("../controllers/mediaSosial.controller");

// PUBLIC
router.get("/", controller.getData);

// ADMIN
router.post("/", auth, controller.saveData);

module.exports = router;
