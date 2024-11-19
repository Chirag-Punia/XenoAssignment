const { publishMessage } = require("../config/RedisPublisher");

const createMultipleCustomers = async (customers) => {
  try {
    // Publish customers in one message or multiple messages as required
    for (const customer of customers) {
      await publishMessage("customerData", customer);
    }
  } catch (error) {
    console.error("Error in creating multiple customers:", error);
    throw new Error("Failed to create multiple customers");
  }
};

module.exports = {
  createMultipleCustomers,
};
