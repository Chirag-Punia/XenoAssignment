const { createCustomer } = require("../services/customerService");
const { validationResult } = require("express-validator");

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

const createCustomerController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, totalSpends, maxVisits, lastVisit } = req.body;
  const userId = req.headers.userId;

  const customerData = {
    name,
    email,
    totalSpends,
    maxVisits,
    lastVisit,
    userId,
  };

  try {
    await createCustomer(customerData);
    res.status(200).json({
      message: "Customer data validated and published successfully",
    });
  } catch (error) {
    console.error("Error publishing customer data:", error);
    res.status(500).json({ error: "Failed to publish customer data" });
  }
};

module.exports = {
  getCustomersController,
  createCustomerController,
};
