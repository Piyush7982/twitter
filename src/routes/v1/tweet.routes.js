const express = require("express");
const router = express.Router();
const { tweetController } = require("../../controller");
const { userMiddleware, multerMiddlware } = require("../../middleware");

router.post(
  "/",
  userMiddleware.authenticationMiddleware,
  multerMiddlware.imageUploadMiddleware,
  tweetController.createTweet
);
router.delete(
  "/:id",
  userMiddleware.authenticationMiddleware,
  tweetController.deleteTweet
);
router.put(
  "/:id",
  userMiddleware.authenticationMiddleware,
  tweetController.updateTweet
);

router.get("/", tweetController.getGlobalTweets);
router.put(
  "/like/:id",
  userMiddleware.authenticationMiddleware,
  tweetController.likeTweet
);
router.get(
  "/user/:id",

  tweetController.findUserTweet
);
router.get("/:id", tweetController.getTweet);

module.exports = { tweetRouter: router };
