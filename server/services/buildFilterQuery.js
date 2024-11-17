const buildFilterQuery = (filters, logic, userId) => {
  let filterGroups = filters
    .map((filter) => {
      const { field, operator, value } = filter;

      if (value === undefined || value === null) return null;

      let condition = {};

      const fieldMapping = {
        spending: "totalSpends",
        visits: "maxVisits",
        lastVisitDate: "lastVisit",
      };

      const actualField = fieldMapping[field] || field;

      switch (operator) {
        case ">":
          condition[actualField] = { $gt: value };
          break;
        case ">=":
          condition[actualField] = { $gte: value };
          break;
        case "<":
          condition[actualField] = { $lt: value };
          break;
        case "<=":
          condition[actualField] = { $lte: value };
          break;
        default:
          throw new Error("Invalid operator provided.");
      }

      return condition;
    })
    .filter(Boolean);

  let query = {};
  if (logic.spendingVisits === "AND") {
    query = {
      $and: [...filterGroups, { userId: userId }],
    };
  } else if (logic.spendingVisits === "OR") {
    query = {
      $or: [...filterGroups, { userId: userId }],
    };
  } else {
    throw new Error("Invalid logic provided. Use 'AND' or 'OR'.");
  }
  return query;
};
module.exports = { buildFilterQuery };
