const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  orderDate: {
    type: Date,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  items: [
    {
      itemName: String,
      quantity: Number,
      price: Number,
    },
  ],
  userId: { type: String, required: true },
});

module.exports = mongoose.model("Order", orderSchema);
