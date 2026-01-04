const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");
const controller = require("../controllers/sambutan.controller");

router.get("/", controller.getSambutan);

router.post("/", auth, controller.createSambutan); 
router.put("/", auth, controller.editSambutan);    

module.exports = router;
