const { StatusCodes } = require("http-status-codes");
const errorResponse = {
  Status: "Failed",
  StatusCode: StatusCodes.BAD_REQUEST,
  Error: {},
  Message: "Something went wrong",
};
module.exports = errorResponse;
