const { createOrder, getOrders } = require("../services/orderService");

const getOrdersController = async (req, res) => {
  const userId = req.headers.userId;
  try {
    const orders = await getOrders(userId);

    if (!orders || orders.length === 0) {
      return res
        .status(404)
        .json({ message: "No orders found for this user." });
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error in fetching orders:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const createOrderController = async (req, res) => {
  const { customerId, orderDate, amount, items } = req.body;
  const userId = req.headers.userId;

  if (!customerId || !orderDate || !amount || !items) {
    return res.status(400).json({ error: "All order details are required." });
  }

  try {
    const result = await createOrder({
      customerId,
      orderDate,
      amount,
      items,
      userId,
    });

    if (result.success) {
      res
        .status(200)
        .json({ message: "Order data successfully published to Redis." });
    } else {
      res.status(500).json({ error: "Failed to publish order data to Redis." });
    }
  } catch (error) {
    console.error("Error in creating order:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  getOrdersController,
  createOrderController,
};
