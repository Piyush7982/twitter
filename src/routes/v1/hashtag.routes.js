const express = require("express");
const router = express.Router();
const { userMiddleware } = require("../../middleware");
const { hashtagController } = require("../../controller");

router.get("/", hashtagController.getTweetsByHashtag);
router.get("/top", hashtagController.getTopHashtag); //query page,limit
router.get(
  "/self",
  userMiddleware.authenticationMiddleware,
  hashtagController.getUsersByHashtag
);

module.exports = { hashtagRouter: router };
