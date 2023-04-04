const {
  registrationService,
  loginService,
  logoutService,
} = require("../services/userServices");

const registration = async (req, res) => {
  const user = req.body;
  const token = await registrationService(user);
  res
    .status(200)
    .json({ status: `Successfully!`, token, user: { email: user.email } });
};

const logIn = async (req, res) => {
  const user = req.body;
  const token = await loginService(user);
  res
    .status(200)
    .send({ status: `Successfully!`, token, user: { email: user.email } });
};

const logout = async (req, res) => {
  const id = req.user._id;
  await logoutService(id);
  res.status(204).json({ status: "No content" });
};

module.exports = {
  registration,
  logIn,
  logout,
};
