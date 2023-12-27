const { StatusCodes } = require("http-status-codes");
const sucessResponse = {
  Status: "Success",
  StatusCode: StatusCodes.ACCEPTED,
  Data: {},
  Message: "Request processed successfully",
};
module.exports = sucessResponse;
