const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET || "SECRET";

const authenticateJwt = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.headers.userId = user.id;
      next();
    });
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = {
  authenticateJwt,
  SECRET,
};
