const { createMultipleCustomers } = require("../services/customerService");
const { validationResult } = require("express-validator");
const Customer = require("../models/Customer");

const getCustomersController = async (req, res) => {
  const userId = req.headers.userId;
  try {
    const customers = await Customer.find({ userId });
    res.json(customers);
  } catch (error) {
    console.error("Error fetching customers:", error);
    res.status(500).json({ error: "Failed to fetch customers" });
  }
};

const createCustomersController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const userId = req.headers.userId;

  try {
    // Generate 30 random customer data
    const customers = Array.from({ length: 30 }).map(() => ({
      name: `Random User ${Math.floor(Math.random() * 10000)}`,
      email: `random${Math.floor(Math.random() * 10000)}@example.com`,
      totalSpends: Math.floor(Math.random() * 1000),
      maxVisits: Math.floor(Math.random() * 100),
      lastVisit: new Date().toISOString(),
      userId,
    }));

    await createMultipleCustomers(customers); // Publish all customers
    res.status(200).json({
      message: "30 random customers created and published successfully",
    });
  } catch (error) {
    console.error("Error publishing customer data:", error);
    res.status(500).json({ error: "Failed to publish customer data" });
  }
};

module.exports = {
  getCustomersController,
  createCustomersController,
};
