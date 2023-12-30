const mongoose = require("mongoose");

const Hashtag = require("./hashtag.schema");
const Like = require("./like.schema");
const Retweet = require("./retweets.schema");
const Schema = mongoose.Schema;
const tweetSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    hashtags: [
      {
        type: Schema.Types.ObjectId,
        ref: "Hashtag",
      },
    ],
    image: {
      type: String,
    },
    likes: {
      type: Schema.Types.ObjectId,
      ref: "Like",
    },

    retweets: [
      {
        type: Schema.Types.ObjectId,
        ref: "Retweet",
      },
    ],
  },
  { timestamps: true }
);

tweetSchema.post("findOneAndDelete", async (doc, next) => {
  if (Boolean(doc.retweets)) {
    await Promise.all(
      doc.retweets.map(async (id) => {
        await Retweet.findOneAndDelete({ _id: id });
      })
    );
  }
  if (Boolean(doc.likes)) {
    await Like.findByIdAndDelete(doc.likes);
  }
  const hashtagIds = doc.hashtags;
  const final = await Promise.all(
    hashtagIds.map(async (id) => {
      await Hashtag.findByIdAndUpdate(id, {
        $pull: { users: doc.user, Model: doc._id },
      });
    })
  );
  next();
});

// tweetSchema.post("save", async function (doc, next) {
//   const a = await User.findByIdAndUpdate(doc.user, {
//     $push: { tweets: doc._id },
//   });
//   next();
// });
//to be done
const Tweet = mongoose.model("Tweet", tweetSchema);
module.exports = Tweet;
