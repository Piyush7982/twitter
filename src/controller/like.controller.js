const { likeService } = require("../service");
const { successResponse, errorResponse } = require("../util/common");

async function getLikeByModel(req, res) {
  try {
    const like = await likeService.getLikeByModel({
      onModel: "Tweet",
      model: req.params.id,
    });
    successResponse.Data = like;
    successResponse.Message = "Tweet liked successfully";
    return res.status(successResponse.StatusCode).json(successResponse);
  } catch (error) {
    errorResponse.Message = "failed to like tweet";
    errorResponse.Error = { error: error.message, name: error.name };
    res.status(errorResponse.StatusCode).json(errorResponse);
  }
}
module.exports = {
  // likeTweet,
  getLikeByModel,
};
