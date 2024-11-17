const { publishMessage } = require("../config/RedisPublisher");
const Customer = require("../models/Customer");

const createCustomer = async (customerData) => {
  try {
    await publishMessage("customerData", customerData);

    const newCustomer = new Customer(customerData);
    await newCustomer.save();
  } catch (error) {
    console.error("Error in creating customer:", error);
    throw new Error("Failed to create customer");
  }
};

module.exports = {
  createCustomer,
};
