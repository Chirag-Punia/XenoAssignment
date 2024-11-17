const {
  signup,
  login,
  googleLogin,
  getUserInfo,
} = require("../services/userService");

const userSignup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const newUser = await signup(name, email, password);
    const token = jwt.sign(
      { id: newUser._id },
      process.env.JWT_SECRET || "SECRET",
      {
        expiresIn: "1h",
      }
    );
    res
      .status(201)
      .json({ msg: "User registered successfully", user: newUser, token });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { user, token } = await login(email, password);
    res.json({ msg: "Login successful", user, token });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const googleLoginHandler = async (req, res) => {
  const { token } = req.body;
  try {
    const { token: jwtToken, user } = await googleLogin(token);
    res.json({ token: jwtToken, user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await getUserInfo(req.headers.userId);
    res.json({ user });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

module.exports = {
  userSignup,
  userLogin,
  googleLoginHandler,
  getUser,
};
