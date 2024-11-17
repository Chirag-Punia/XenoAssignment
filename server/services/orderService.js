const { publishMessage } = require("../config/RedisPublisher");
const Order = require("../models/Order");

const getOrders = async (userId) => {
  try {
    return await Order.find({ userId });
  } catch (error) {
    console.error("Error in fetching orders:", error);
    throw new Error("Failed to fetch orders");
  }
};

const createOrder = async ({
  customerId,
  orderDate,
  amount,
  items,
  userId,
}) => {
  try {
    const orderData = {
      customerId,
      orderDate,
      amount,
      items,
      userId,
    };

    return await publishMessage("orders", orderData);
  } catch (error) {
    console.error("Error in creating order:", error);
    throw new Error("Failed to create order");
  }
};

module.exports = {
  getOrders,
  createOrder,
};
