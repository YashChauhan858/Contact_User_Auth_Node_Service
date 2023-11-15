import errorConstants from "../constants.js";

const errorHandler = (error, req, res, next) => {
  const statusCode = res.statusCode
    ? res.statusCode
    : errorConstants.SERVER_ERROR;
  switch (statusCode) {
    case errorConstants.VALIDATION_ERROR:
      res.status(statusCode).json({
        title: "Validation Error",
        message: error.message,
        stackTrace: error.stack,
      });
      break;
    case errorConstants.NOT_FOUND:
      res.status(statusCode).json({
        title: "Not Found",
        message: error.message,
        stackTrace: error.stack,
      });
      break;
    case errorConstants.UNAUTHORIZED:
      res.status(statusCode).json({
        title: "unauthorized",
        message: error.message,
        stackTrace: error.stack,
      });
      break;
    case errorConstants.FORBIDDEN:
      res.status(statusCode).json({
        title: "forbidden",
        message: error.message,
        stackTrace: error.stack,
      });
      break;
    case errorConstants.SERVER_ERROR:
      res.status(statusCode).json({
        title: "Server Error",
        message: error.message,
        stackTrace: error.stack,
      });
      break;
    default:
      break;
  }
};

export default errorHandler;
