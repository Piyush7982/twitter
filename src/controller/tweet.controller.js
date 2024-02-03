const { tweetService } = require("../service");
const {
  successResponse,
  errorResponse,
  customError,
} = require("../util/common");

async function createTweet(req, res) {
  try {
    const tweet = await tweetService.createTweet({
      content: req.body.content,
      users: req.user.id,
      image: req?.file?.url,
    });
    successResponse.Data = tweet;
    successResponse.Message = "Tweet created successfully";
    return res.status(successResponse.StatusCode).json(successResponse);
  } catch (error) {
    errorResponse.Message = "failed to create tweet";
    errorResponse.Error = { error: error.message, name: error.name };
    res.status(errorResponse.StatusCode).json(errorResponse);
  }
}
async function deleteTweet(req, res) {
  try {
    const tweet = await tweetService.deleteTweet({
      _id: req.params.id,
      user: req.user.id,
    });
    successResponse.Data = tweet;
    successResponse.Message = "Tweet deleted successfully";
    return res.status(successResponse.StatusCode).json(successResponse);
  } catch (error) {
    errorResponse.Message = "failed to delete tweet";
    errorResponse.Error = { error: error.message, name: error.name };
    res.status(errorResponse.StatusCode).json(errorResponse);
  }
}
async function updateTweet(req, res) {
  try {
    const tweet = await tweetService.updateTweet({
      _id: req.params.id,
      user: req.user.id,
      content: req.body.content,
    });
    successResponse.Data = tweet;
    successResponse.Message = "Tweet updated successfully";
    return res.status(successResponse.StatusCode).json(successResponse);
  } catch (error) {
    errorResponse.Message = "failed to update tweet";
    errorResponse.Error = { error: error.message, name: error.name };
    res.status(errorResponse.StatusCode).json(errorResponse);
  }
}
async function getTweet(req, res) {
  try {
    const tweet = await tweetService.findTweetByTweetId(
      (id = req.params.id),
      (limit = req.query.limit),
      (page = req.query.page)
    );
    successResponse.Data = tweet;
    successResponse.Message = "Tweet found successfully";
    return res.status(successResponse.StatusCode).json(successResponse);
  } catch (error) {
    errorResponse.Message = "failed to find tweet";
    errorResponse.Error = { error: error.message, name: error.name };
    res.status(errorResponse.StatusCode).json(errorResponse);
  }
}
async function getGlobalTweets(req, res) {
  try {
    const tweet = await tweetService.globalTweet({
      limit: req.query.limit,
      page: req.query.page,
    });
    successResponse.Data = tweet;
    successResponse.Message = "Tweet found successfully";
    return res.status(successResponse.StatusCode).json(successResponse);
  } catch (error) {
    errorResponse.Message = "failed to find tweet";
    errorResponse.Error = { error: error.message, name: error.name };
    res.status(errorResponse.StatusCode).json(errorResponse);
  }
}
async function likeTweet(req, res) {
  try {
    const tweet = await tweetService.likeTweet({
      _id: req.params.id,
      users: req.user.id,
    });
    successResponse.Data = tweet;
    successResponse.Message = "Tweet liked successfully";
    return res.status(successResponse.StatusCode).json(successResponse);
  } catch (error) {
    errorResponse.Message = "failed to like tweet";
    errorResponse.Error = { error: error.message, name: error.name };
    res.status(errorResponse.StatusCode).json(errorResponse);
  }
}
async function findUserTweet(req, res) {
  try {
    const tweet = await tweetService.FindTweetByUser({
      id: req.params.id,
      limit: req.query.limit,
      page: req.query.page,
    });

    successResponse.Data = tweet;
    successResponse.Message = "Tweet found   successfully";
    return res.status(successResponse.StatusCode).json(successResponse);
  } catch (error) {
    errorResponse.Message = "failed to like tweet";
    errorResponse.Error = { error: error.message, name: error.name };
    res.status(errorResponse.StatusCode).json(errorResponse);
  }
}
module.exports = {
  createTweet,
  deleteTweet,
  updateTweet,
  getGlobalTweets,
  getTweet,
  likeTweet,
  findUserTweet,
};
