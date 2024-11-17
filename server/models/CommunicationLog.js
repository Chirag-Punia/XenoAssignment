const mongoose = require("mongoose");

const communicationLogSchema = new mongoose.Schema({
  audienceId: { type: mongoose.Schema.Types.ObjectId, ref: "Audience" },
  message: String,
  status: { type: String, default: "PENDING" },
  sentAt:Date,
  createdAt: Date,
  batchId: mongoose.Schema.Types.ObjectId,
  sentMessages: [
    {
      customerEmail: String,
      status: { type: String, default: "PENDING" },
      sentAt: Date,
    },
  ],
  userId: { type: String, required: true },
});

module.exports = mongoose.model("CommunicationLog", communicationLogSchema);
