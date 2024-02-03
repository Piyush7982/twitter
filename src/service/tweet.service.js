const hashtagService = require("./hashtag.service");
const mongoose = require("mongoose");
const likeService = require("./like.service");

const { tweetRepository, userRepository } = require("../repository");
const { generateHashtag } = require("../util/Miscellaneous");
const tweetRepo = new tweetRepository();
const userRepo = new userRepository();

async function createTweet(tweet) {
  const session = await mongoose.startSession();

  session.startTransaction();
  try {
    const { content, users, image } = tweet;

    const hashtag = await generateHashtag(content);

    const result = await tweetRepo.create({
      content: content,
      user: users,
      image: image,
    });
    const tweetId = result._id;
    const hash = await Promise.all(
      hashtag.map(async (tag) => {
        return await hashtagService.createHashtag({
          content: tag,
          onModel: "Tweet",
          Model: [tweetId],
          users: [users],
        });
      })
    );

    const hashtagIds = await hashtagService.getHashtagByTweet(tweetId);

    const final = await tweetRepo.update(tweetId, { hashtags: hashtagIds });
    await userRepo.update(users, { $push: { tweets: tweetId } });

    //gethashtagfromtweet and update in tweet
    session.commitTransaction();
    return final;
    //to be continued
  } catch (error) {
    session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
}
async function likeTweet(tweet) {
  try {
    const { _id, users } = tweet;

    const exist = await findTweetByTweetId(_id);

    const like = await likeService.createLike({
      onModel: "Tweet",
      model: _id,
      users: users,
    });

    const likeId = like._id;

    if (Boolean(exist.likes)) {
      return;
    } else {
      const result = await tweetRepo.update(_id, { likes: likeId });
    }
  } catch (error) {
    throw error;
  }
}
async function globalTweet(data) {
  try {
    const { limit, page } = data;
    const result = await tweetRepo.getGlobalTweets(limit, page);
    return result;
  } catch (error) {
    throw error;
  }
}
async function findTweetByTweetId(id, limit, page) {
  try {
    const tweet = await tweetRepo.findOne(id, limit, page);
    return tweet;
  } catch (error) {
    throw error;
  }
}
async function updateTweet(tweet) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { content, _id, user } = tweet;
    const hashtag = await generateHashtag(content);
    filter = { user: user, _id: _id };

    const result = await tweetRepo.updateUserTweet(filter, {
      content: content,
    });

    if (!result) {
      throw new Error("tweet not found");
    }

    // const tweetId = result._id;
    const hash = await Promise.all(
      hashtag.map(async (tag) => {
        return await hashtagService.createHashtag({
          content: tag,
          onModel: "Tweet",
          Model: [_id],
          users: [user],
        });
      })
    );

    const hashtagIds = await hashtagService.getHashtagByTweet(_id);

    const final = await tweetRepo.update(_id, { hashtags: hashtagIds });

    session.commitTransaction();
    return final;
  } catch (error) {
    session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
}
async function FindTweetByUser(data) {
  try {
    const { limit, page, id } = data;
    const result = await tweetRepo.getUserTweet(limit, page, id);
    return result;
  } catch (error) {
    throw error;
  }
}
async function deleteTweet(data) {
  try {
    const result = await tweetRepo.deleteUserTweet(data);
    return result;
  } catch (error) {
    throw error;
  }
}
//continue
module.exports = {
  createTweet,
  findTweetByTweetId,
  updateTweet,
  deleteTweet,
  FindTweetByUser,
  likeTweet,
  globalTweet,
};
