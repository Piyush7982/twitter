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
      default:
        "https://imgs.search.brave.com/xvvGnk0zqBUA0YmR20NLpPn8WZfA1iqs6ozKyPO-0B4/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNjI2/NDY0MTU4L3Bob3Rv/L2NhdC13aXRoLW9w/ZW4tbW91dGguanBn/P3M9NjEyeDYxMiZ3/PTAmaz0yMCZjPVFy/OURDVmt3S21fZHpm/amtlTjVmb0NCcDdj/M0VmQkZfaTJBMGV0/WWlKT0E9",
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
