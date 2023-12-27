const { successResponse, errorResponse } = require("../util/common");
async function getServerStatus(req, res) {
  try {
    successResponse.Data = "Server is running";
    successResponse.Message = "Server is running";
    return res.json(successResponse).status(successResponse.StatusCode);
  } catch (error) {
    errorResponse.Message = "failed to get server status";
    errorResponse.Error = { error: error.message, name: error.name };
    res.json(errorResponse).status(errorResponse.StatusCode);
  }
}
module.exports = { getServerStatus };
