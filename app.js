const express = require("express");
const app = express();
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const contactsRouter = require("./src/routes/api/contacts");

mongoose.set("strictQuery", true);
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.gpuqivv.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  if (err?.error?.isJoi) {
    return res.status(400).json({
      type: err.type,
      message: err.error.toString(),
    });
  }

  if (err?.code === 11000) {
    return res.status(400).json({ message: "Duplicate key error" });
  }

  if (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = app;
