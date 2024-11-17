const {
  createCampaign,
  deliveryReceipt,
  getAllCampaigns,
} = require("../services/campaignService");

const createCampaignController = async (req, res) => {
  const { audienceCriteria, message } = req.body;
  const userId = req.headers.userId;

  try {
    const { communicationLog } = await createCampaign(
      audienceCriteria,
      message,
      userId
    );

    res.json({
      communicationLog
    });
  } catch (err) {
    console.error("Error creating campaign:", err);
    res.status(500).json({ error: err.message });
  }
};

const deliveryReceiptController = async (req, res) => {
  const { campaignId } = req.body;
  const userId = req.headers.userId;
  if (!campaignId) {
    return res.status(400).json({ message: "Campaign ID is required" });
  }

  try {
    const statusUpdates = await deliveryReceipt({campaignId, userId});
    res.status(200).json({ message: "Delivery receipt processed", statusUpdates });
  } catch (error) {
    console.error("Error processing delivery receipt:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllCampaignsController = async (req, res) => {
  try {
    const userId = req.headers.userId;
    const campaigns = await getAllCampaigns(userId);
    res.status(200).json(campaigns);
  } catch (error) {
    console.error("Error fetching campaigns:", error);
    res.status(500).json({ message: "Failed to fetch campaigns" });
  }
};

module.exports = {
  createCampaignController,
  deliveryReceiptController,
  getAllCampaignsController,
};
