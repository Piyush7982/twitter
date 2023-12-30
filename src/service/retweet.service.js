const hashtagService = require("./hashtag.service");
const mongoose = require("mongoose");
const likeService = require("./like.service");
const { retweetRepository, tweetRepository } = require("../repository");
const { generateHashtag } = require("../util/Miscellaneous");
const retweetRepo = new retweetRepository();
const tweetRepo = new tweetRepository();

async function createRetweet(Retweet) {
  const session = await mongoose.startSession();

  session.startTransaction();
  try {
    const { content, users, tweetId } = Retweet;
    const hashtag = await generateHashtag(content);

    const result = await retweetRepo.create({
      content: content,
      user: users,
      tweet: tweetId,
    });
    const RetweetId = result._id;
    const hash = await Promise.all(
      hashtag.map(async (tag) => {
        return await hashtagService.createHashtag({
          content: tag,
          onModel: "Retweet",
          Model: [RetweetId],
          users: [users],
        });
      })
    );

    const hashtagIds = await hashtagService.getHashtagByRetweet(RetweetId);

    const final = await retweetRepo.update(RetweetId, { hashtags: hashtagIds });
    await tweetRepo.update(tweetId, { $push: { retweets: RetweetId } });
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
async function likeRetweet(retweet) {
  try {
    const { _id, users } = retweet;
    const exist = await findRetweetByRetweetId(_id);

    const like = await likeService.createLike({
      onModel: "Retweet",
      model: _id,
      users: users,
    });
    const likeId = like._id;
    if (Boolean(exist.likes)) {
      return;
    } else {
      const result = await retweetRepo.update(_id, { likes: likeId });
    }
  } catch (error) {
    throw error;
  }
}
async function findRetweetByRetweetId(id) {
  try {
    const retweet = await retweetRepo.findOne(id);
    return retweet;
  } catch (error) {
    throw error;
  }
}
async function updateRetweet(Retweet) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { content, _id, user } = Retweet;

    const hashtag = await generateHashtag(content);
    filter = { user: user, _id: _id };
    const result = await retweetRepo.updateUserReweet(filter, {
      content: content,
    });
    if (!result) {
      throw new Error("retweet not found");
    }

    // const tweetId = result._id;
    const hash = await Promise.all(
      hashtag.map(async (tag) => {
        return await hashtagService.createHashtag({
          content: tag,
          onModel: "Retweet",
          Model: [_id],
          users: [user],
        });
      })
    );

    const hashtagIds = await hashtagService.getHashtagByRetweet(_id);

    const final = await retweetRepo.update(_id, { hashtags: hashtagIds });

    session.commitTransaction();
    return final;
  } catch (error) {
    session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
}
async function FindReweetByUser(data) {
  try {
    const result = await retweetRepo.getRetweet({ user: data.userId });
    return result;
  } catch (error) {
    throw error;
  }
}
async function deleteRetweet(id) {
  try {
    const result = await retweetRepo.deleteUserRetweet(id);
    return result;
  } catch (error) {
    throw error;
  }
}
//continue
module.exports = {
  createRetweet,
  findRetweetByRetweetId,
  updateRetweet,
  FindReweetByUser,
  deleteRetweet,
  likeRetweet,
};
