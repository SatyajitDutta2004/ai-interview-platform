const jwt = require("jsonwebtoken");
const tokenBlacklistModel = require("../models/blacklist.model");

async function authUser(req, res, next) {
  let token = req.cookies?.token;

  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!token && authHeader) {
    const [tokenType, tokenValue] = authHeader.split(" ");

    if (tokenType === "Bearer" && tokenValue) {
      token = tokenValue;
    }
  }

  if (!token) {
    return res.status(401).json({
      message: "token not provided.",
    });
  }

  const isTokenBlacklisted = await tokenBlacklistModel.findOne({ token });

  if (isTokenBlacklisted) {
    return res.status(401).json({
      message: "token is invalid.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    req.token = token;

    next();
  } catch (err) {
    return res.status(401).json({
      message: "invalid token.",
    });
  }
}

module.exports = { authUser };
