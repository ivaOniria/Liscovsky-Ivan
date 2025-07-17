class FunctionalError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.name = "FunctionalError";
    this.statusCode = statusCode;
    this.functionalMessage = message;
  }
}

export default FunctionalError;