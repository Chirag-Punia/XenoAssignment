const Audience = require("../models/Audience");
const Customer = require("../models/Customer");
const { buildFilterQuery } = require("../services/buildFilterQuery");

const createAudience = async (filters, logic, userId, name) => {
  let criteria = {};

  filters.forEach((filter) => {
    const { field, operator, value } = filter;

    if (value === undefined || value === null) return;

    switch (field) {
      case "spending":
        criteria.spending = value;
        break;
      case "visits":
        criteria.visits = value;
        break;
      case "lastVisitDate":
        criteria.lastVisitDate = value;
        break;
      default:
        break;
    }
  });

  criteria.logic = logic.spendingVisits;

  const query = buildFilterQuery(filters, logic, userId);

  const customers = await Customer.find(query);

  const customerData = customers.map((customer) => ({
    name: customer.name,
    email: customer.email,
    totalSpends: customer.totalSpends,
    maxVisits: customer.maxVisits,
    lastVisit: customer.lastVisit,
    userId: customer.userId,
  }));

  const newAudience = new Audience({
    name,
    criteria: criteria,
    createdAt: new Date(),
    customers: customerData,
    userId: userId,
  });

  await newAudience.save();

  return customerData;
};

const calculateAudienceSize = async (filters, logic, userId) => {
  const query = buildFilterQuery(filters, logic, userId);
  const customers = await Customer.find(query);
  return customers.length;
};

const getAudiencesForUser = async (userId) => {
  const audiences = await Audience.find({ userId }).sort({ createdAt: -1 });

  return audiences.map((audience) => ({
    _id: audience._id,
    name: audience.name,
    criteria: audience.criteria,
    createdAt: audience.createdAt,
    customers: audience.customers.length,
  }));
};

module.exports = {
  createAudience,
  calculateAudienceSize,
  getAudiencesForUser,
};
