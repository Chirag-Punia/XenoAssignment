const { publishMessage } = require("../config/RedisPublisher");

const createCustomer = async (customerData) => {
  try {
    await publishMessage("customerData", customerData);

  } catch (error) {
    console.error("Error in creating customer:", error);
    throw new Error("Failed to create customer");
  }
};

module.exports = {
  createCustomer,
};
