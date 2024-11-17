const CommunicationLog = require("../models/CommunicationLog");
const Audience = require("../models/Audience");
const { publishMessage } = require("../config/RedisPublisher");
const mongoose = require("mongoose");

const deliveryReceipt = async (campaignId) => {
  try {
    const campaign = await CommunicationLog.findById(campaignId);
    if (!campaign) {
      throw new Error("Campaign not found");
    }

    const statusUpdates = [];

    campaign.sentMessages.forEach((message) => {
      const personalizedMessage = `Hi ${message.customerName}, ${campaign.message}`;
      const status = Math.random() < 0.9 ? "SENT" : "FAILED";

      publishMessage("campaigns", {
        customerEmail: message.customerEmail,
        personalizedMessage: personalizedMessage,
        status: status,
      });

      statusUpdates.push({
        customerEmail: message.customerEmail,
        status: status,
        deliveryStatusUpdatedAt: new Date(),
      });
    });

    const bulkUpdatePromises = statusUpdates.map((statusUpdate) => {
      return CommunicationLog.updateOne(
        {
          _id: campaignId,
          "sentMessages.customerEmail": statusUpdate.customerEmail,
        },
        {
          $set: {
            "sentMessages.$.status": statusUpdate.status,
            "sentMessages.$.deliveryStatusUpdatedAt":
              statusUpdate.deliveryStatusUpdatedAt,
          },
        }
      );
    });

    await Promise.all(bulkUpdatePromises);

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
    const statusUpdates = await deliveryReceipt(audience.customers, message);

    const bulkUpdatePromises = statusUpdates.map((statusUpdate) => {
      return CommunicationLog.updateOne(
        { userId, "sentMessages.customerEmail": statusUpdate.customerEmail },
        {
          $set: {
            "sentMessages.$.status": statusUpdate.status,
            "sentMessages.$.deliveryStatusUpdatedAt":
              statusUpdate.deliveryStatusUpdatedAt,
          },
        }
      );
    });

    await Promise.all(bulkUpdatePromises);

    const logs = statusUpdates.map((statusUpdate) => ({
      customerEmail: statusUpdate.customerEmail,
      status: statusUpdate.status,
      sentAt: new Date(),
    }));

    const communicationLog = new CommunicationLog({
      audienceId: audienceCriteria.segmentId,
      message,
      status: "COMPLETED",
      sentAt: new Date(),
      batchId,
      sentMessages: logs,
      userId,
    });

    await communicationLog.save();

    return { logs: communicationLog.sentMessages, batchId };
  } catch (err) {
    console.error("Error in createCampaign:", err);
    throw new Error("Failed to create campaign");
  }
};
const getAllCampaigns = async (userId) => {
  try {
    return await CommunicationLog.find({ userId })
      .populate("audienceId")
      .sort({ createdAt: -1 });
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
