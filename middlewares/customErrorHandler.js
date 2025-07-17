import FunctionalError from "../utils/FunctionalError.js";

const customErrorHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = err.message;

  if (err instanceof FunctionalError) {
    statusCode = err.statusCode;
    message = err.functionalMessage;
  }
  res.status(statusCode).send({ errorMsg: message });
};

export default customErrorHandler;