const express = require("express");
const router = express.Router();

const validator = require("express-joi-validation").createValidator({
  passError: true,
});

const tryCatch = require("../../utils/try-catch.util");
const { addPosts, getPosts } = require("../../controllers/postsController");
const { postValidation } = require("../../middlewares/postValidation");

router
  .post("/posts", validator.body(postValidation), tryCatch(addPosts))
  .get("/posts", tryCatch(getPosts));
module.exports = router;
