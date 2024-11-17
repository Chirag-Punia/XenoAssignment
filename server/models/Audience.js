const mongoose = require("mongoose");

const audienceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  criteria: {
    spending: { type: Number, min: 0 },
    visits: { type: Number, min: 0 },
    lastVisitDate: { type: Date },
    logic: {
      type: String,
      enum: ["AND", "OR"],
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  customers: [
    {
      name: { type: String, required: true },
      email: { type: String, required: true },
      totalSpends: { type: Number, required: true },
      maxVisits: { type: Number, required: true },
      lastVisit: { type: Date, required: true },
    },
  ],
  userId: { type: String, required: true },
});

module.exports = mongoose.model("Audience", audienceSchema);
