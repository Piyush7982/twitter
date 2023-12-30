const crud = require("./crud.repository");
const { customError } = require("../util/common");
const { StatusCodes } = require("http-status-codes");
const { Retweet } = require("../model");
class retweetRepository extends crud {
  constructor() {
    super(Retweet);
  }
  async getRetweet(data) {
    try {
      const retweet = await Retweet.find(data);
      return retweet;
    } catch (error) {
      throw new customError(error.message, StatusCodes.BAD_REQUEST, error.name);
    }
  }
  async updateUserReweet(filter, updateData) {
    try {
      const retweet = await Retweet.findOneAndUpdate(filter, updateData, {
        new: true,
      });
      return retweet;
    } catch (error) {
      throw new customError(
        "Not authorised",
        StatusCodes.BAD_REQUEST,
        error.name
      );
    }
  }
  async deleteUserRetweet(data) {
    try {
      const retweet = await Retweet.findOneAndDelete(data);
      return retweet;
    } catch (error) {
      throw error;
    }
  }
}
module.exports = retweetRepository;
