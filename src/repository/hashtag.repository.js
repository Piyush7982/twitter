const crud = require("./crud.repository");
const { Hashtag } = require("../model");
const { customError } = require("../util/common");
const { StatusCodes } = require("http-status-codes");
const { pagination } = require("../util/Miscellaneous");

class hashtagRepository extends crud {
  constructor() {
    super(Hashtag);
  }
  async findByModel(Model, onModel) {
    try {
      const result = await this.model.find({
        Model: Model,
        onModel: onModel,
      });
      //start here
      return result;
    } catch (error) {
      throw new customError(error.message, StatusCodes.BAD_REQUEST, error.name);
    }
  }
  async findByContent(content, onModel) {
    try {
      const result = await this.model.findOne({
        content: content,
        onModel: onModel,
      });
      return result;
    } catch (error) {
      throw new customError(error.message, StatusCodes.BAD_REQUEST, error.name);
    }
  }
  async findModelsOnHashtag(content, onModel) {
    try {
      const result = await Hashtag.aggregate([
        {
          $match: {
            content: content,
            onModel: onModel,
          },
        },

        {
          $lookup: {
            from: onModel === "Tweet" ? "tweets" : "retweets",
            localField: "Model",
            foreignField: "_id",
            as: "result",
          },
        },
        {
          $project: {
            Tweet: "$result",
            count: {
              $size: "$result",
            },
          },
        },
      ]);
      // const result = await Hashtag.find({
      //   content: content,
      //   onModel: onModel,
      // }).populate("Model");

      return result;
    } catch (error) {
      throw new customError(
        error.message,
        StatusCodes.BAD_REQUEST,
        "FAiled to find tweets on hashtag"
      );
    }
  }
  async findUsersHashtag(userId) {
    try {
      const result = await this.model.find({ users: userId });
      return result;
    } catch (error) {
      throw new customError(
        error.message,
        StatusCodes.BAD_REQUEST,
        "FAiled to find users  hashtag"
      );
    }
  }
  async getTopHashtag(limit, page) {
    try {
      const result = await Hashtag.aggregate([
        {
          $project: {
            numOfUsers: {
              $size: "$users",
            },
          },
        },
        {
          $sort: {
            numOfUsers: -1,
          },
        },
        {
          $skip: (page * 1 - 1) * (limit * 1),
        },
        {
          $limit: limit * 1,
        },
      ]);
      return result;
    } catch (error) {
      throw new customError(
        error.message,
        StatusCodes.BAD_REQUEST,
        "FAiled to find users  hashtag"
      );
    }
  }
}

module.exports = hashtagRepository;
