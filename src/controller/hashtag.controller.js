const { hashtagService } = require("../service");
const {
  successResponse,
  errorResponse,
  customError,
} = require("../util/common");
async function getTweetsByHashtag(req, res) {
  try {
    const tweets = await hashtagService.getTweetsByHashtag({
      content: req.body.content,
      onModel: req.body.onModel,
    });
    successResponse.Data = tweets;
    successResponse.Message = "Tweets found successfully";
    return res.status(successResponse.StatusCode).json(successResponse);
  } catch (error) {
    errorResponse.Message = "failed to find tweets";
    errorResponse.Error = { error: error.message, name: error.name };
    res.status(errorResponse.StatusCode).json(errorResponse);
  }
}
async function getUsersByHashtag(req, res) {
  try {
    const users = await hashtagService.getUsersHashtag({
      userId: req.user.id,
    });
    successResponse.Data = users;
    successResponse.Message = "Users found successfully";
    return res.status(successResponse.StatusCode).json(successResponse);
  } catch (error) {
    errorResponse.Message = "failed to find users";
    errorResponse.Error = { error: error.message, name: error.name };
    res.status(errorResponse.StatusCode).json(errorResponse);
  }
}
async function getTopHashtag(req, res) {
  try {
    const tweets = await hashtagService.getTopHashtag({
      limit: req.query.limit,
      page: req.query.page,
    });
    successResponse.Data = tweets;
    successResponse.Message = "Tweets found successfully";
    return res.status(successResponse.StatusCode).json(successResponse);
  } catch (error) {
    errorResponse.Message = "failed to find tweets";
    errorResponse.Error = { error: error.message, name: error.name };
    res.status(errorResponse.StatusCode).json(errorResponse);
  }
}

module.exports = {
  getTweetsByHashtag,
  getUsersByHashtag,
  getTopHashtag,
};
