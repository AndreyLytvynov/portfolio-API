const { NotAuthorizedError } = require("../helpers/errors");
const { jwtVerify } = require("../utils/jwt.util");
const User = require("../models/user.model");

const isAuthorized = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send({
      message: "Not authorized",
    });
  }
  try {
    const decoded = jwtVerify(token);

    const user = await User.findOne({
      _id: decoded._id,
    });

    if (!user.token) {
      return res.status(401).send({
        message: "Not authorized",
      });
    }

    req.user = user;

    next();
  } catch (err) {
    next(new NotAuthorizedError("Not authorized"));
  }
};

module.exports = { isAuthorized };
