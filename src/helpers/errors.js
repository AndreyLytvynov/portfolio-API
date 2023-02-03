class CastError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class ValidationError extends CastError {
  constructor(message) {
    super(message);
    this.status = 404;
  }
}

class NotAuthorizedError extends CastError {
  constructor(message) {
    super(message);
    this.status = 401;
  }
}

module.exports = { CastError, ValidationError, NotAuthorizedError };
