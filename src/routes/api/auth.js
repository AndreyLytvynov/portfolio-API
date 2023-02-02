const express = require("express");
const router = express.Router();
const validator = require("express-joi-validation").createValidator({
  passError: true,
});
const {
  registration,
  logIn,
  logout,
} = require("../../controllers/userController");

const { isAuthorized } = require("../../middlewares/isAuthorizedMiddleware");

const tryCatch = require("../../utils/try-catch.util");
const {
  signupValidation,
  loginValidation,
} = require("../../middlewares/validationUserMiddlewares");

router
  .post(
    "/users/signup",
    validator.body(signupValidation),
    tryCatch(registration)
  )
  .post("/users/login", validator.body(loginValidation), tryCatch(logIn))
  .get("/users/logout", isAuthorized, tryCatch(logout));

module.exports = router;
