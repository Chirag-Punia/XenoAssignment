const express = require("express");
const router = express.Router();
const { authenticateJwt } = require("../middleware/auth");
const {
  getOrdersController,
  createOrderController,
} = require("../controllers/orderController");

router.get("/", authenticateJwt, getOrdersController);

router.post("/", authenticateJwt, createOrderController);

module.exports = router;
