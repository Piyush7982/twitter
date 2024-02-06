const crud = require("./crud.repository");
const { Hashtag, User } = require("../model");
const { customError } = require("../util/common");
const { StatusCodes } = require("http-status-codes");
const { pagination } = require("../util/Miscellaneous");
const { populate } = require("../model/hashtag.schema");

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
            content: "lion",
            onModel: "Tweet",
          },
        },
        {
          $lookup: {
            from: "tweets",
            localField: "Model",
            foreignField: "_id",
            as: "result",
          },
        },
        {
          $unwind: "$result",
        },
        {
          $lookup: {
            from: "users",
            localField: "result.user",
            foreignField: "_id",
            as: "result.user",
          },
        },
        {
          $unwind: "$result.user",
        },
        {
          $project: {
            "result.content": 1,
            "result.hashtags": 1,
            "result.likes": 1,
            "result.retweets": 1,
            "result.createdAt": 1,
            "result.updatedAt": 1,
            "result.__v": 1,
            "result.user": {
              userName: 1,
              coverPhoto: 1,
            },
          },
        },
        {
          $group: {
            _id: "$_id",
            Tweet: { $push: "$result" },
            count: { $sum: 1 },
          },
        },
      ]);

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
  async getTopHashtag(limit = 5, page = 1) {
    try {
      const result = await Hashtag.aggregate([
        {
          $unwind: "$Model",
        },
        {
          $lookup: {
            from: "tweets",
            localField: "Model",
            foreignField: "_id",
            as: "tweet",
          },
        },
        {
          $unwind: "$tweet",
        },
        {
          $group: {
            _id: "$_id",
            content: { $first: "$content" },
            count: { $sum: 1 },
            latestTweetDate: { $max: "$tweet.createdAt" },
          },
        },
        {
          $match: {
            count: { $gte: 1 },
          },
        },
        {
          $sort: {
            count: -1,
            latestTweetDate: -1,
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
