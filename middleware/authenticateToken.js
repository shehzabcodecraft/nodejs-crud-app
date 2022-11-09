const jwt = require("jsonwebtoken");
const newError = require("../services/newError");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (authHeader == null) {
    next(newError("Token not provided", 401));
  }
  jwt.verify(authHeader, process.env.ACCESS_TOKEN_SECRET, (err, userName) => {
    if (err) {
      next(newError("Invalid token", 403));
    }
    req.userName = userName;
    next();
  });
};

module.exports = authenticateToken;
