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

// create();
//pagination implement

app.use("/api", router);
app.listen(SERVER_CONFIG.PORT, () => {
  console.log(`Server is running on port ${SERVER_CONFIG.PORT}`);
});
