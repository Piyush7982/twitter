const mongoose = require("mongoose");
const Hashtag = require("./hashtag.schema");
const Like = require("./like.schema");
const Schema = mongoose.Schema;
const retweetSchema = new Schema(
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
    tweet: {
      type: Schema.Types.ObjectId,
      ref: "Tweet",
      required: true,
    },
    hashtags: [
      {
        type: Schema.Types.ObjectId,
        ref: "Hashtag",
      },
    ],

    likes: {
      type: Schema.Types.ObjectId,
      ref: "Like",
    },
  },
  { timestamps: true }
);
retweetSchema.post("findOneAndDelete", async (doc, next) => {
  const hashtagIds = doc.hashtags;

  if (Boolean(doc.likes)) {
    await Like.findByIdAndDelete(doc.likes);
  }
  const final = await Promise.all(
    hashtagIds.map(async (id) => {
      await Hashtag.findByIdAndUpdate(id, {
        $pull: { users: doc.user, Model: doc._id },
      });
    })
  );
  next();
});
const Retweet = mongoose.model("Retweet", retweetSchema);
module.exports = Retweet;
