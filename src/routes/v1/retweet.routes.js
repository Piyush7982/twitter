const express = require("express");
const router = express.Router();
const { retweetController } = require("../../controller");
const { userMiddleware } = require("../../middleware");

router.post(
  "/:id",
  userMiddleware.authenticationMiddleware,
  retweetController.createRetweet
);
router.delete(
  "/:id",
  userMiddleware.authenticationMiddleware,
  retweetController.deleteRetweet
);
router.put(
  "/:id",
  userMiddleware.authenticationMiddleware,
  retweetController.updateRetweet
);
router.put(
  "/like/:id",
  userMiddleware.authenticationMiddleware,
  retweetController.likeRetweet
);
router.get(
  "/user",
  userMiddleware.authenticationMiddleware,
  retweetController.getUserRetweet
);
router.get("/:id", retweetController.getRetweet);

module.exports = { retweetRouter: router };
