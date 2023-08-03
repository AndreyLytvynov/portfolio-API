const express = require("express");
const app = express();
const logger = require("morgan");
const cors = require("cors");
const postsRouter = require("./src/routes/api/posts");
const errorHandler = require("./src/helpers/errorHandler");

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(express.static("public"));
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use("/api/", postsRouter);
app.use((_, res) => {
  res.status(404).json({ status: "Not found" });
});
app.use(errorHandler);

module.exports = app;
