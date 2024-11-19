const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { authenticateJwt } = require("../middleware/auth");
const {
  getCustomersController,
    createCustomersController,
} = require("../controllers/customerController");

router.get("/", authenticateJwt, getCustomersController);

router.post(
  "/",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Email is required"),
    body("totalSpends")
      .isNumeric()
      .withMessage("Total Spends should be a number"),
    body("maxVisits").isNumeric().withMessage("Max Visits should be a number"),
    body("lastVisit")
      .isISO8601()
      .withMessage("Last Visit should be a valid date"),
  ],
  authenticateJwt,
    createCustomersController
);

module.exports = router;
