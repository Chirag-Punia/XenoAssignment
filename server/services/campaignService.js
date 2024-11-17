const CommunicationLog = require("../models/CommunicationLog");
const Audience = require("../models/Audience");
const { publishMessage } = require("../config/RedisPublisher");
const mongoose = require("mongoose");

const deliveryReceipt = async ({campaignId, userId}) => {
  try {
    const campaign = await CommunicationLog.findById(campaignId);
    if (!campaign) {
      throw new Error("Campaign not found");
    }

    const statusUpdates = [];

    campaign.sentMessages.forEach((message) => {
      const personalizedMessage = `Hi ${message.customerName}, ${campaign.message}`;

      publishMessage("message-delivery", {
        batchId:campaign.batchId,
        customerEmail: message.customerEmail,
        personalizedMessage: personalizedMessage,
        userId
      });

      statusUpdates.push({
        customerEmail: message.customerEmail,
        sentAt: new Date(),
      });
    });

    return statusUpdates;
  } catch (error) {
    console.error("Error in delivery receipt:", error);
    throw error;
  }
};

const createCampaign = async (audienceCriteria, message, userId) => {
  try {
  
    const audience = await Audience.findOne({
      _id: audienceCriteria.segmentId,
      userId,
    });

    if (!audience) throw new Error("Audience segment not found");

  
    const batchId = new mongoose.Types.ObjectId();

  
    const logs = audience.customers.map((customer) => ({
      customerEmail: customer.email,
      status: "PENDING",
      sentAt: null,
    }));

  
    const communicationLog = new CommunicationLog({
      audienceId: audienceCriteria.segmentId,
      message,
      status: "PENDING", // Campaign state is pending
      createdAt: new Date(),
      batchId,
      sentMessages: logs,
      userId,
    });

    await communicationLog.save();

    return { communicationLog };
  } catch (err) {
    console.error("Error in createCampaign:", err);
    throw new Error("Failed to create campaign");
  }
};

const getAllCampaigns = async (userId) => {
  try {
    const u =  await CommunicationLog.find({ userId })
      .populate("audienceId")
      .sort({ createdAt: -1 });
    return u;
  } catch (error) {
    console.error("Error in getAllCampaigns service:", error);
    throw new Error("Failed to fetch campaigns");
  }
};
module.exports = {
  createCampaign,
  getAllCampaigns,
  deliveryReceipt,
};
