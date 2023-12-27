const crud = require("./crud.repository");
const { Tweet } = require("../model");
const { pagination } = require("../util/Miscellaneous");
const { customError } = require("../util/common");

class tweetRepository extends crud {
  constructor() {
    super(Tweet);
  }
  async getTweet(data) {
    try {
      const tweet = await Tweet.find(data);

      return tweet;
    } catch (error) {
      throw error;
    }
  }
  async getGlobalTweets(limit, page) {
    try {
      const tweet = await pagination(Tweet, limit, page, {}, { createdAt: -1 });
      // const tweet = await Tweet.find({}).sort({ createdAt: -1 });
      //populate user
      return tweet;
    } catch (error) {}
  }
  async deleteUserTweet(data) {
    try {
      const tweet = await Tweet.findOneAndDelete(data);
      return tweet;
    } catch (error) {
      throw error;
    }
  }
  async updateUserTweet(filter, updateData) {
    try {
      const tweet = await Tweet.findOneAndUpdate(filter, updateData, {
        new: true,
      });
      return tweet;
    } catch (error) {
      throw new customError(
        "Not authorised",
        StatusCodes.BAD_REQUEST,
        error.name
      );
    }
  }
  async findOne(_id) {
    try {
      const tweet = await this.model
        .findById(_id)
        .populate(["likes", "retweets"]);
      return tweet;
    } catch (error) {
      throw new customError(error.message, StatusCodes.BAD_REQUEST, error.name);
    }
  }
}
module.exports = tweetRepository;
