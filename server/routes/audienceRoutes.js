const express = require("express");
const router = express.Router();
const { authenticateJwt } = require("../middleware/auth");
const {
  create,
  calculateSize,
  getAll,
} = require("../controllers/audienceController");

router.post("/create", authenticateJwt, create);
router.post("/calculate-size", authenticateJwt, calculateSize);
router.get("/", authenticateJwt, getAll);

module.exports = router;
