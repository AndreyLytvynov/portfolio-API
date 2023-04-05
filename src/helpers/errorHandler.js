const { CastError } = require("./errors");

const errorHandler = (err, req, res, next) => {
  if (err?.error?.isJoi) {
    return res.status(400).json({
      type: err.type,
      status: err.error.toString(),
    });
  }

  if (err instanceof CastError) {
    return res
      .status(err.status)
      .json({ status: err.message, statusCode: 404 });
  }

  if (err?.code === 11000) {
    return res
      .status(400)
      .json({ status: "Duplicate key error", statusCode: 400 });
  }

  if (err) {
    return res.status(500).json({ status: "Internal server error" });
  }
};
module.exports = errorHandler;
