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
      // throw new customError(
      //   "Token not found",
      //   StatusCodes.BAD_REQUEST,
      //   "Authentication Error"
      // );
    }
    const response = await jwt.tokenVerify(token);

    if (!response.id) {
      errorResponse.Message = "user not found";
      errorResponse.Error = "Authentication Error";
      errorResponse.StatusCode = StatusCodes.UNAUTHORIZED;
      res.status(errorResponse.StatusCode).json(errorResponse);
      return;
      // throw new customError(
      //   "User Not found",
      //   StatusCodes.INTERNAL_SERVER_ERROR,
      //   "Authentication Error"
      // );
    }
    req.user = response;

    next();
  } catch (error) {
    errorResponse.Message = error.Message;
    errorResponse.Error = error.name;
    errorResponse.StatusCode = StatusCodes.UNAUTHORIZED;
    res.status(errorResponse.StatusCode).json(errorResponse);
    return;
  }
}

module.exports = { authenticationMiddleware };
