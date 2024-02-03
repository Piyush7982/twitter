const crud = require("./crud.repository");
const { Tweet } = require("../model");
const { pagination } = require("../util/Miscellaneous");
const { customError } = require("../util/common");
const { StatusCode } = require("../util/common/error.response");

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
  async getUserTweet(limit, page, id) {
    try {
      // console.log(userName, limit, page);
      const tweet = await pagination(
        Tweet,
        limit,
        page,
        { user: id },
        { createdAt: -1 }
      );

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
  async findOne(_id, limit = 1, page = 1) {
    try {
      limit = limit * 1;
      page = page * 1;
      const tweet = await this.model
        .findById(_id)
        .populate("likes", ["count", "users"])
        .populate("user", ["userName", "coverPhoto"])
        .populate({
          path: "retweets",
          options: {
            limit: limit * 1,
            skip: (page - 1) * limit * 1,
            sort: { createdAt: -1 },
          },
          populate: { path: "user", select: ["userName", "coverPhoto"] },
        });

      return tweet;
    } catch (error) {
      throw new customError(error.message, StatusCodes.BAD_REQUEST, error.name);
    }
  }
}
module.exports = tweetRepository;
