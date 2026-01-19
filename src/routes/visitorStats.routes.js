const express = require("express");
const {
  countVisitor,
  getVisitorStats,
} = require("../controllers/visitorStats.controller");

const router = express.Router();

router.post("/count", countVisitor);
router.get("/stats", getVisitorStats);

module.exports = router;
