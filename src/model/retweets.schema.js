const mongoose = require("mongoose");
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
const Retweet = mongoose.model("Retweet", retweetSchema);
module.exports = Retweet;
