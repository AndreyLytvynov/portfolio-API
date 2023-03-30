const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const { jwtToken } = require("../utils/jwt.util");
const gravatar = require("gravatar");
require("dotenv").config();

const registration = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).send({
      message: "User with this email already exists",
    });
  }

  const avatarURL = gravatar.url(email, { protocol: "https" });
  const newUser = await User.create({
    email,
    password,
    avatarURL,
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

    res.status(200).json({ status: `Successfully!` });
  }
};

const logIn = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).send({
      message: "Not authorized",
    });
  }

  if (!(await bcrypt.compare(password, user.password))) {
    return res.status(401).send({
      message: "Not authorized",
    });
  }

  if (!user.token) {
    const token = jwtToken({ _id: user._id });
    await User.findOneAndUpdate(user._id, { token });
    res.status(200).send({ status: `Successfully!`, token });
  }

  res.status(200).send({ status: `Successfully!`, token: user.token });
};

const logout = async (req, res) => {
  await User.findOneAndUpdate(
    {
      _id: req.user._id,
    },
    {
      token: null,
    }
  );

  res.status(204).json({ status: "No content" });
};

module.exports = {
  registration,
  logIn,
  logout,
};
