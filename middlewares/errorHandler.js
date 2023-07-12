const createHttpError = require("http-errors");

const errorHandler = (error,req,res,next) => {
    const serverError = createHttpError.InternalServerError();
      const statusCode = error.status || serverError.status;
      const message = error.message || serverError.message;
      return res.status(statusCode).json({
        statusCode,
        errors: {
          message,
        },
      });
}
module.exports = {
    errorHandler,
}