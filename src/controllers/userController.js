const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const { jwtToken } = require("../utils/jwt.util");
const gravatar = require("gravatar");
const path = require("path");
const Jimp = require("jimp");
const { v4: uuid } = require("uuid");
require("dotenv").config();
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const registration = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).send({
      message: "User with this email already exists",
    });
  }
  const verificationToken = uuid();
  const avatarURL = gravatar.url(email, { protocol: "https" });
  const newUser = await User.create({
    email,
    password,
    avatarURL,
    verificationToken,
  });
  const token = jwtToken({ _id: newUser._id });

  const msg = {
    to: email, // Change to your recipient
    from: "mrjastonehome@gmail.com", // Change to your verified sender
    subject: "Thank you for registering",
    text: "Please, confirm your email address",
    html: `Please, confirm your email <a href="http://localhost:3000/api/auth/users/verify/${verificationToken}">address</a>`,
  };

  await sgMail.send(msg);

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

  const user = await User.findOne({ email, verify: true });

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

const verificationEmail = async (req, res) => {
  const { verificationToken } = req.params;

  const verificationUser = await User.findOne({ verificationToken });

  if (!verificationUser) {
    return res.status(401).send({
      message: "Your email is not verified",
    });
  }

  await User.findByIdAndUpdate(verificationUser._id, {
    verificationToken: null,
    verify: true,
  });

  res.status(200).json({ message: "Verification successful" });
};

const repeatVerificationEmail = async (req, res) => {
  const { email } = req.body;

  const verificationUser = await User.findOne({ email });

  if (!verificationUser) {
    return res.status(400).send({
      message: "Missing required field email",
    });
  }

  if (verificationUser.verify) {
    return res.status(400).send({
      message: "Verification has already been passed",
    });
  }

  const msg = {
    to: email, // Change to your recipient
    from: "mrjastonehome@gmail.com", // Change to your verified sender
    subject: "Thank you for registering",
    text: "Please, confirm your email address",
    html: `Please, confirm your email <a href="http://localhost:3000/api/auth/users/verify/${verificationUser.verificationToken}">
  address
</a>`,
  };

  await sgMail.send(msg);

  res.status(200).json({
    message: "Verification email sent",
  });
};

module.exports = {
  registration,
  logIn,
  logout,
  updateAvatar,
  verificationEmail,
  repeatVerificationEmail,
};
