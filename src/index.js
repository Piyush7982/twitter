const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");
const router = require("./routes");
// const { Tweet, Retweet, Hashtag, Like, User } = require("./model");
// const { userRepository, tweetRepository } = require("./repository");
// const {
//   tweetService,
//   hashtagService,
//   retweetService,
//   likeService,
//   userService,
// } = require("./service");
const { DATABASE_CONFIG, SERVER_CONFIG } = require("./config");

DATABASE_CONFIG.connect();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);

// const mongoose = require("mongoose");
async function create() {
  // const session = await mongoose.startSession();

  try {
    // session.startTransaction();
    // const user= new userRepository();
    // const ans = await user.update()
    // const ans = await likeService.updateLike({
    //   onModel: "Tweet",
    //   model: "6581a155dd8c60f18cce49f7",
    //   users: ["65799c2ad3ff6742a5297c15"],
    // });
    // const ans = await userService.createUser({
    //   userName: "test1233",
    //   email: "piyushi@1233",
    //   password: "hellohiii",
    // });

    // let limit = 2;
    // let page = 2;
    // const ans = await Tweet.find({})
    //   .limit(limit)
    //   .skip((page - 1) * limit);

    // const ans = await userService.isFollowed({
    //   user: { _id: "65799ca1d828940097fd419f" },
    //   userToFollow: { userName: "test" },
    // });
    //   "$2b$06$IAzaCh6VKGZMrG3i/1QSHemUjsrGp/7fTsRVAWKVpBPEI3q8ZBI7a"
    // const ans = await userService.deleteUser({
    //   userName: "test12",
    // });
    // const ans = await likeService.getLikeByModel({
    //   model: "6581a155dd8c60f18cce49f8",
    //   onModel: "Tweet",
    // });
    // const ans = await tweetService.likeTweet({
    //   _id: "6581a0c2018a3c03193f91cd",
    //   users: ["658300dadb6594d608da39c4"],
    // });
    // const ans = await tweetService.findTweetByTweetId({
    //   _id: "6581a0c2018a3c03193f91cd",
    // });
    console.log(ans);
    // const ans = await retweetService.createRetweet({
    //   content: "retweetin #fat",
    //   user: "65799c2ad3ff6742a5297cf7",
    //   tweetId: "65819eab0ee8c27a96deab8e",
    // });
    // console.log(ans2);
    // const ans = await retweetService.createRetweet({
    //   content: "zestn",
    //   onModel: "Tweet",
    //   Model: ["658126c1c2f9fc97c3852a77"],
    //   users: ["65799ca1d828940097fd419f"],
    // });
    // const ans3 = await await Hashtag.findOne(
    //   { content: "sherr", onModel: "Retweet" },
    //   null,
    //   { session }
    // );
    // session.commitTransaction();
  } catch (error) {
    // session.abortTransaction();
    console.error(error);
  }
  // const user1 = await Hashtag.findOne({ content: "first hashtag" });
  // console.log(user1.users);
  //
  //   return;
  // const user = await Hashtag.findById("6579a161ef80e194889e9920").populate(
  //   "Model"
  // );
  //   {
  //     path: "Tweet",
  //     model: "Tweet",
  //   }
}
// create();
//pagination implement

app.use("/api", router);
app.listen(SERVER_CONFIG.PORT, () => {
  console.log(`Server is running on port ${SERVER_CONFIG.PORT}`);
});
