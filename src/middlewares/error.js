const ErrorMiddleware = (error, req, res, next) => {
  const statusCode = error.statusCode ?? 500;
  const message = error.statusCode ? error.message : "Internal Server Error";

  return res.status(error.name === "ValidationError" ? 400 : statusCode).json({
    message: error.name === "ValidationError" ? error.message : message,
  });
};

module.exports = ErrorMiddleware;
