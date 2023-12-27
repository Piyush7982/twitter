const express = require("express");
const router = express.Router();
const { infoController } = require("../../controller");
const { userRouter } = require("./user.routes");
const { tweetRouter } = require("./tweet.routes");
const { likeRouter } = require("./like.routes");
const { hashtagRouter } = require("./hashtag.routes");
const { retweetRouter } = require("./retweet.routes");

router.use("/user", userRouter);
router.use("/retweet", retweetRouter);
router.use("/hashtag", hashtagRouter);
router.use("/tweet", tweetRouter);
router.use("/like", likeRouter);
router.get("/info", infoController.getServerStatus);

module.exports = { v1Router: router };
