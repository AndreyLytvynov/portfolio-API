const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const { jwtToken } = require("../utils/jwt.util");
const gravatar = require("gravatar");
const path = require("path");
const Jimp = require("jimp");

const registration = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    return res.status(400).send({
      message: "User with this email already exists",
    });
  }

  const avatarURL = gravatar.url(email, { protocol: "https" });
  const newUser = await User.create({ email, password, avatarURL });

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

    res.status(200).json({ status: `Successfully!`, token });
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

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const file = req.file;

  const newFileName = `${Date.now()}_${file.originalname}`;
  const folderPath = path.resolve("public/avatars");
  const newPath = path.join(folderPath, newFileName);

  await Jimp.read(file.path)
    .then((avatar) => {
      return avatar.resize(250, 250).rotate(90).write(newPath);
    })
    .catch((error) => {
      throw error;
    });

  const avatarURL = path.join("avatars", newFileName);

  const user = await User.findOneAndUpdate(
    _id,
    {
      avatarURL,
    },
    { new: true }
  );

  res.status(200).json({
    user: {
      avatarURL: user.avatarURL,
    },
  });
};

module.exports = {
  registration,
  logIn,
  logout,
  updateAvatar,
};
