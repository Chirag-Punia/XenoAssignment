const {
  createAudience,
  calculateAudienceSize,
  getAudiencesForUser,
} = require("../services/audienceService");

const create = async (req, res) => {
  const { name, filters, logic } = req.body;

  try {
    const userId = req.headers.userId;
    const customerData = await createAudience(filters, logic, userId, name);
    res.json({ audience: customerData, size: customerData.length });
  } catch (error) {
    console.error("Error creating audience", error);
    res.status(500).json({ message: "Error creating audience segment" });
  }
};

const calculateSize = async (req, res) => {
  const { filters, logic } = req.body;

  try {
    const userId = req.headers.userId;
    const size = await calculateAudienceSize(filters, logic, userId);
    res.json({ size });
  } catch (error) {
    console.error("Error calculating audience size", error);
    res.status(500).json({ message: "Error calculating audience size" });
  }
};

const getAll = async (req, res) => {
  try {
    const userId = req.headers.userId;
    const audienceData = await getAudiencesForUser(userId);
    res.json(audienceData);
  } catch (error) {
    console.error("Error fetching audiences", error);
    res.status(500).json({ message: "Error fetching audience segments" });
  }
};

module.exports = {
  create,
  calculateSize,
  getAll,
};
