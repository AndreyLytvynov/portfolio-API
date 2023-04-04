const User = require("../models/user.model");
const { NotAuthorizedError } = require("../helpers/errors");
const bcrypt = require("bcrypt");
const { jwtToken } = require("../utils/jwt.util");
require("dotenv").config();

const registrationService = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (user) {
    throw new NotAuthorizedError("User with this email already exists");
  }

  const newUser = await User.create({
    email,
    password,
  });

  const token = jwtToken({ _id: newUser._id });
  if (newUser) {
    await User.findOneAndUpdate(
      {
        _id: newUser._id,
      },
      {
        token,
      }
    ).select("-password");
  }
  return token;
};

const loginService = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new NotAuthorizedError("Not authorized");
  }

  if (!(await bcrypt.compare(password, user.password))) {
    throw new NotAuthorizedError("Not authorized");
  }

  if (!user.token) {
    const token = jwtToken({ _id: user._id });
    await User.findOneAndUpdate(user._id, { token });
    return token;
  }
};

const logoutService = async (id) => {
  await User.findOneAndUpdate(
    {
      _id: id,
    },
    {
      token: null,
    }
  );
};

module.exports = {
  registrationService,
  loginService,
  logoutService,
};
