const mongoose = require("mongoose");
const hashtag = require("./hashtag.schema");
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
tweetSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    console.log("inside delete");

    const hashtagIds = this.hashtags;

    const final = await Promise.all(
      hashtagIds.map(async (id) => {
        await mongoose.model(hashtag).findByIdAndUpdate(id, {
          $pull: { users: this.user, Model: this._id },
        });
      })
    );
    next();
  }
);
//to be done
const Tweet = mongoose.model("Tweet", tweetSchema);
module.exports = Tweet;