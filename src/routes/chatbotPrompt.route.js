const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth.middleware");
const controller = require("../controllers/ChatbotPrompt.controller");

// PUBLIC (dipakai chatbot)
router.get("/public", controller.getPublic);

// ADMIN
router.get("/", auth, controller.getAll);
router.post("/", auth, controller.create);
router.put("/:id", auth, controller.update);
router.delete("/:id", auth, controller.delete);

module.exports = router;
