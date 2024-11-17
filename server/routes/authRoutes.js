const express = require("express");
const router = express.Router();
const { authenticateJwt } = require("../middleware/auth");
const {
  userSignup,
  userLogin,
  googleLoginHandler,
  getUser,
} = require("../controllers/userController");

router.post("/signup", userSignup);
router.post("/login", userLogin);
router.post("/google-login", googleLoginHandler);
router.get("/me", authenticateJwt, getUser);

module.exports = router;
