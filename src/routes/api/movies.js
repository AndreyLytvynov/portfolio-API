const express = require("express");
const router = express.Router();
const { isAuthorized } = require("../../middlewares/isAuthorizedMiddleware");
const tryCatch = require("../../utils/try-catch.util");
const {
  addMovie,
  getMovies,
  deleteMovie,
  getCurrentMovie,
} = require("../../controllers/movieController");

router
  .post("/favorites", isAuthorized, tryCatch(addMovie))
  .delete("/favorites", isAuthorized, tryCatch(deleteMovie))
  .get("/favorites", isAuthorized, tryCatch(getMovies))
  .get("/favorites/current", isAuthorized, tryCatch(getCurrentMovie));

module.exports = router;
