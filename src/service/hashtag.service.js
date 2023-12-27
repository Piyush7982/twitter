const { StatusCodes } = require("http-status-codes");
const { hashtagRepository } = require("../repository");
const { customError } = require("../util/common");

const hashtagRepo = new hashtagRepository();
async function createHashtag(hashtag) {
  try {
    const { content, onModel, Model, users } = hashtag;
    const exist = await hashtagRepo.findByContent(content, onModel);
    // console.log(exist.users.push(users));
    if (Boolean(exist)) {
      await hashtagRepo.update(exist._id, {
        users: [...exist.users, ...users],
        Model: [...exist.Model, ...Model],
      });
      return exist;
    } else {
      const newHashtag = await hashtagRepo.create(hashtag);
      return newHashtag;
    }
  } catch (error) {
    throw error;
  }
}

async function getHashTag(hashtag) {
  try {
    const { content, onModel } = hashtag;
    const result = await hashtagRepo.findByContent(content, onModel);
    if (!Boolean(result)) {
      throw new customError(
        "Hashtag not found",
        StatusCodes.NOT_FOUND,
        "HashtagNotFound"
      );
    }
    return result;
  } catch (error) {
    throw error;
  }
}
async function getHashtagByRetweet(RetweetId) {
  try {
    const result = await hashtagRepo.findByModel(RetweetId, "Retweet");

    const hashtagIds = result.map((hashtag) => {
      return hashtag._id;
    });

    return hashtagIds;
  } catch (error) {
    throw error;
  }
}
async function getHashtagByTweet(tweetId) {
  try {
    const result = await hashtagRepo.findByModel(tweetId, "Tweet");

    const hashtagIds = result.map((hashtag) => {
      return hashtag._id;
    });

    return hashtagIds;
  } catch (error) {
    throw error;
  }
}

async function getUsersHashtag(data) {
  try {
    const { userId } = data;

    const users = await hashtagRepo.findUsersHashtag(userId);
    return users;
  } catch (error) {
    throw error;
  }
}
async function getTweetsByHashtag(hashtag) {
  try {
    const { content, onModel } = hashtag;
    const users = await hashtagRepo.findModelsOnHashtag(content, onModel);
    return users;
  } catch (error) {
    throw error;
  }
}
async function getTopHashtag(filter) {
  try {
    const { limit, page } = filter;
    const result = await hashtagRepo.getTopHashtag(limit, page);
    return result;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createHashtag,
  getHashTag,
  getUsersHashtag,
  getTweetsByHashtag,
  getHashtagByTweet,
  getHashtagByRetweet,
  getTopHashtag,
};
