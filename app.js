const express = require("express");
const app = express();
const logger = require("morgan");
const cors = require("cors");

const contactsRouter = require("./src/routes/api/contacts");
const authRouter = require("./src/routes/api/auth");

const errorHandler = require("./src/helpers/errorHandler");

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);
app.use("/api/auth", authRouter);

app.use((req, res) => {
  res.status(404).json({ status: "Not found" });
});

app.use(errorHandler);

module.exports = app;
