const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");
const controller = require("../controllers/mediaSosial.controller");

router.get("/", controller.getData);

router.post("/", auth, controller.createData); 
router.put("/", auth, controller.editData);   

module.exports = router;
