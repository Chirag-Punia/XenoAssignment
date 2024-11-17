const { redisClient, connectRedis } = require("./redisClient");
const Customer = require("../models/Customer");
const Order = require("../models/Order");
const CommunicationLog = require("../models/CommunicationLog");

const batchQueue = [];
const BATCH_SIZE = 10;
let batchTimeout = null;
const BATCH_FLUSH_INTERVAL = 5000;

const flushBatch = async () => {
  if (batchQueue.length === 0) return;

  const batch = [...batchQueue];
  batchQueue.length = 0;

  try {
    console.log(`Flushing batch of size ${batch.length}`);
    const bulkOperations = batch.map(
      ({ batchId, customerEmail, audienceId, userId, status }) => ({
        updateOne: {
          filter: {
            batchId,
            audienceId,
            userId,
            "sentMessages.customerEmail": customerEmail,
          },
          update: {
            $set: {
              "sentMessages.$.status": status,
              "sentMessages.$.deliveryStatusUpdatedAt": new Date(),
            },
          },
        },
      })
    );

    const result = await CommunicationLog.bulkWrite(bulkOperations);
    console.log(`Batch processed: ${result.modifiedCount} messages updated`);
  } catch (error) {
    console.error("Error flushing batch:", error.message);
  }
};

const handleDeliveryReceipt = async (message) => {
  try {
    const { batchId, customerEmail, audienceId, userId } = JSON.parse(message);

    const status = Math.random() < 0.9 ? "SENT" : "FAILED";

    batchQueue.push({ batchId, customerEmail, audienceId, userId, status });

    console.log(
      `Queued message for ${customerEmail}, queue size: ${batchQueue.length}`
    );

    if (batchQueue.length >= BATCH_SIZE) {
      clearTimeout(batchTimeout);
      await flushBatch();
    } else if (!batchTimeout) {
      batchTimeout = setTimeout(() => {
        flushBatch();
        batchTimeout = null;
      }, BATCH_FLUSH_INTERVAL);
    }
  } catch (error) {
    console.error("Error processing delivery receipt:", error.message);
  }
};

const handleOrderMessage = async (message) => {
  try {
    const orderData = JSON.parse(message);
    console.log("Processing order data:", orderData);

    const order = new Order({
      customerId: orderData.customerId,
      orderDate: new Date(orderData.orderDate),
      amount: orderData.amount,
      items: orderData.items,
      userId: orderData.userId,
    });

    await order.save();
    console.log("Order data saved successfully:", order);
  } catch (error) {
    console.error("Error saving order data:", error.message);
  }
};

const handleCustomerMessage = async (message) => {
  try {
    const customerData = JSON.parse(message);
    console.log("Processing customer data:", customerData);

    const customer = new Customer({
      name: customerData.name,
      email: customerData.email,
      totalSpends: customerData.totalSpends,
      maxVisits: customerData.maxVisits,
      lastVisit: customerData.lastVisit,
      userId: customerData.userId,
    });

    await customer.save();
    console.log("Customer data saved successfully:", customer);
  } catch (error) {
    console.error("Error parsing or saving customer data:", error.message);
  }
};

const setupRedisSubscriber = async () => {
  try {
    await connectRedis();

    console.log("Redis Subscriber connected successfully");

    await Promise.all([
      redisClient.subscribe("orders", handleOrderMessage),
      redisClient.subscribe("customerData", handleCustomerMessage),
      redisClient.subscribe("message-delivery", handleDeliveryReceipt),
    ]);

    console.log(
      "Subscribed to channels: orders, customerData, message-delivery"
    );
  } catch (error) {
    console.error("Error during Redis Subscriber setup:", error.message);
  }
};

module.exports = setupRedisSubscriber;
