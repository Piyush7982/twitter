const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Tweet = require("./tweet.schema");
const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      default: "",
    },

    coverPhoto: {
      type: String,
      default: "https://shorturl.at/izDGO",
    },
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    tweets: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tweet",
      },
    ],
  },
  { timestamps: true }
);
userSchema.post("findOneAndDelete", async (doc, next) => {
  const tweets = doc.tweets;

  if (Boolean(tweets)) {
    const final = await Promise.all(
      tweets.map(async (id) => {
        await Tweet.findOneAndDelete({ _id: id });
      })
    );
  }
  // const tweets = await Tweet.deleteMany({ user: doc._id });
  next();
});
userSchema.methods.isFollowed = async function (id) {
  return await this.followers.includes(id);
};
const User = mongoose.model("User", userSchema);
module.exports = User;
