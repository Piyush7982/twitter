const crud = require("./crud.repository");

const { User } = require("../model");
const { customError } = require("../util/common");
const { StatusCodes } = require("http-status-codes");
class userRepository extends crud {
  constructor() {
    super(User);
  }
  async exists(data) {
    try {
      const result = await this.model.exists(data);
      return Boolean(result);
    } catch (error) {
      throw new customError(
        error.message,
        StatusCodes.INTERNAL_SERVER_ERROR,
        error.name
      );
    }
  }
  async deleteByUsername(userName) {
    try {
      const result = await this.model.findOneAndDelete({ userName });
      return result;
    } catch (error) {
      throw new customError(
        error.message,
        StatusCodes.INTERNAL_SERVER_ERROR,
        error.name
      );
    }
  }
  async getUserByCredential(data) {
    try {
      const user = await User.findOne(data);
      return user;
    } catch (error) {
      throw error;
    }
  }
  async getFollowers(userName) {
    try {
      const user = await User.findOne(userName)
        .populate("followers", "userName")
        .select("followers");
      return user;
    } catch (error) {
      throw error;
    }
  }
  async getFollowing(userName) {
    try {
      const user = await User.findOne(userName)
        .populate("following", "userName")
        .select("following");
      return user;
    } catch (error) {
      throw error;
    }
  }
  async getTweetsByUserName(userName) {
    try {
      const user = await User.findOne(userName)
        .populate("tweets")
        .select("tweets");
      return user;
    } catch (error) {
      throw error;
    }
  }
  async getUserPrivateInfo(data) {
    try {
      const user = await User.findOne(data).select("-password");
      return user;
    } catch (error) {
      throw error;
    }
  }
  async isFollowed(data) {
    try {
      const { userId, userToFollowNAme } = data;
      const user = await User.findOne({ userName: userToFollowNAme });

      const result = await user.isFollowed(userId);
      return result;
    } catch (error) {
      throw error;
    }
  }
  async findUserBySearch(userName, limit, page = 1) {
    try {
      const user = await User.find({
        userName: { $regex: userName, $options: "i" },
      })
        .select("userName")
        .limit(limit * 1)
        .skip((page - 1) * limit * 1);
      return user;
    } catch (error) {
      throw new customError(
        error.message,
        StatusCodes.INTERNAL_SERVER_ERROR,
        error.name
      );
    }
  }
}
module.exports = userRepository;
