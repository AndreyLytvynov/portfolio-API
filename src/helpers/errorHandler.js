const errorHandler = (err, req, res, next) => {
  if (err?.error?.isJoi) {
    return res.status(400).json({
      type: err.type,
      message: err.error.toString(),
    });
  }

  if (err) {
    return res.status(500).json({ status: "Internal server error" });
  }
};
module.exports = errorHandler;
