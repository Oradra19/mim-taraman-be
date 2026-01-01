const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");
const controller = require("../controllers/saran.controller");

// PUBLIC
router.post("/", controller.create);

// ADMIN
router.get("/", auth, controller.getAll);
router.delete("/:id", auth, controller.delete);

module.exports = router;
