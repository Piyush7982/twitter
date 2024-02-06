const { StatusCodes } = require("http-status-codes");
const { customError, errorResponse } = require("../util/common");
const { jwt } = require("../util/authorisation");

async function authenticationMiddleware(req, res, next) {
  try {
    const token = req.cookies.access_token;

    if (!token) {
      errorResponse.Message = "Token not found";
      errorResponse.Error = "Authentication Error";
      errorResponse.StatusCode = StatusCodes.UNAUTHORIZED;
      res.status(errorResponse.StatusCode).json(errorResponse);
      return;
    }
    const response = await jwt.tokenVerify(token);

    if (!response.id) {
      errorResponse.Message = "user not found";
      errorResponse.Error = "Authentication Error";
      errorResponse.StatusCode = StatusCodes.UNAUTHORIZED;
      res.status(errorResponse.StatusCode).json(errorResponse);
      return;
    }
    req.user = response;

    next();
  } catch (error) {
    errorResponse.Message = error.Message;
    errorResponse.Error = error.name;
    errorResponse.StatusCode = StatusCodes.REQUEST_TIMEOUT;
    res.status(errorResponse.StatusCode).json(errorResponse);
    return;
  }
}

module.exports = { authenticationMiddleware };
