const express = require("express");
const router = express.Router();
const { authenticateJwt } = require("../middleware/auth");
const {
  createCampaignController,
  deliveryReceiptController,
  getAllCampaignsController,
} = require("../controllers/campaignController");

router.post("/create", authenticateJwt, createCampaignController);

router.put("/delivery-receipt", authenticateJwt, deliveryReceiptController);

router.get("/", authenticateJwt, getAllCampaignsController);

module.exports = router;
