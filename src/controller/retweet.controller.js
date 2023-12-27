const { retweetService } = require("../service");
// const { likeRetweet } = require("../service/retweet.service");
const {
  successResponse,
  errorResponse,
  customError,
} = require("../util/common");

async function createRetweet(req, res) {
  try {
    const retweet = await retweetService.createRetweet({
      content: req.body.content,
      users: req.user.id,
      tweetId: req.params.id,
    });
    successResponse.Data = retweet;
    successResponse.Message = "Retweet created successfully";
    return res.status(successResponse.StatusCode).json(successResponse);
  } catch (error) {
    errorResponse.Message = "failed to create retweet";
    errorResponse.Error = { error: error.message, name: error.name };
    res.status(errorResponse.StatusCode).json(errorResponse);
  }
}
async function deleteRetweet(req, res) {
  try {
    const retweet = await retweetService.deleteRetweet({
      _id: req.params.id,
      user: req.user.id,
    });
    successResponse.Data = retweet;
    successResponse.Message = "Retweet deleted successfully";
    return res.status(successResponse.StatusCode).json(successResponse);
  } catch (error) {
    errorResponse.Message = "failed to delete retweet";
    errorResponse.Error = { error: error.message, name: error.name };
    res.status(errorResponse.StatusCode).json(errorResponse);
  }
}
async function updateRetweet(req, res) {
  try {
    const retweet = await retweetService.updateRetweet({
      _id: req.params.id,
      user: req.user.id,
      content: req.body.content,
    });
    successResponse.Data = retweet;
    successResponse.Message = "Retweet updated successfully";
    return res.status(successResponse.StatusCode).json(successResponse);
  } catch (error) {
    errorResponse.Message = "failed to update retweet";
    errorResponse.Error = { error: error.message, name: error.name };
    res.status(errorResponse.StatusCode).json(errorResponse);
  }
}
async function getRetweet(req, res) {
  try {
    const retweet = await retweetService.findRetweetByRetweetId(
      (id = req.params.id)
    );
    successResponse.Data = retweet;
    successResponse.Message = "Retweet found successfully";
    return res.status(successResponse.StatusCode).json(successResponse);
  } catch (error) {
    errorResponse.Message = "failed to find retweet";
    errorResponse.Error = { error: error.message, name: error.name };
    res.status(errorResponse.StatusCode).json(errorResponse);
  }
}
async function getUserRetweet(req, res) {
  try {
    const retweet = await retweetService.FindReweetByUser({
      userId: req.user.id,
    });
    successResponse.Data = retweet;
    successResponse.Message = "Retweet found successfully";
    return res.status(successResponse.StatusCode).json(successResponse);
  } catch (error) {
    errorResponse.Message = "failed to find retweet";
    errorResponse.Error = { error: error.message, name: error.name };
    res.status(errorResponse.StatusCode).json(errorResponse);
  }
}
async function likeRetweet(req, res) {
  try {
    const retweet = await retweetService.likeRetweet({
      _id: req.params.id,
      users: req.user.id,
    });
    successResponse.Data = retweet;
    successResponse.Message = "Retweet liked successfully";
    return res.status(successResponse.StatusCode).json(successResponse);
  } catch (error) {
    errorResponse.Message = "failed to like retweet";
    errorResponse.Error = { error: error.message, name: error.name };
    res.status(errorResponse.StatusCode).json(errorResponse);
  }
}

module.exports = {
  createRetweet,
  updateRetweet,
  getRetweet,
  getUserRetweet,
  deleteRetweet,
  likeRetweet,
};
