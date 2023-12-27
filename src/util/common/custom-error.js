class CustomError extends Error {
  //message = error.message,name= error.name
  constructor(message, statusCode, name) {
    super(message);
    this.statusCode = statusCode;
    this.name = name;
    // this.explanation = Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = CustomError;
