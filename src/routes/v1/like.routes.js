const express = require("express");
const router = express.Router();
const { userMiddleware } = require("../../middleware");
const { likeController } = require("../../controller");

router.get("/:id", likeController.getLikeByModel);
// router.post(
//   "/:id",
//   userMiddleware.authenticationMiddleware,
//   likeController.likeTweet
// );

module.exports = { likeRouter: router };
