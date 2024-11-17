const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const User = require("../models/admin");
const { SECRET } = require("../middleware/auth");

const signup = async (name, email, password) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username: name, email, password: hashedPassword });
  await newUser.save();
  return newUser;
};

const login = async (email, password) => {
  const foundUser = await User.findOne({ email });
  if (!foundUser) {
    throw new Error("User does not exist");
  }
  const passwordMatch = await bcrypt.compare(password, foundUser.password);
  if (!passwordMatch) {
    throw new Error("Wrong password");
  }
  const token = jwt.sign({ id: foundUser._id }, SECRET, { expiresIn: "1h" });
  return { user: foundUser, token };
};

const googleLogin = async (token) => {
  const googleResponse = await axios.get(
    `https://www.googleapis.com/oauth2/v3/userinfo`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const { email, sub: googleId, name } = googleResponse.data;

  let userInstance = await User.findOne({ email });

  if (!userInstance) {
    userInstance = new User({ email, googleId, name });
    await userInstance.save();
  } else if (!userInstance.googleId) {
    throw new Error("Email is registered with a different method");
  }

  const jwtToken = jwt.sign({ id: userInstance._id }, SECRET, {
    expiresIn: "1h",
  });
  return { token: jwtToken, user: { name, email } };
};

const getUserInfo = async (userId) => {
  const userInstance = await User.findOne({ _id: userId });
  if (!userInstance) {
    throw new Error("User not logged in");
  }
  return userInstance;
};

module.exports = {
  signup,
  login,
  googleLogin,
  getUserInfo,
};
