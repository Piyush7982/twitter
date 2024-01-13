const express = require("express");
const router = express.Router();
const { userController } = require("../../controller");
const { userMiddleware } = require("../../middleware");

router.post("/signup", userController.signUp);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/:userName", userController.getUser);
router.delete(
  "/",
  userMiddleware.authenticationMiddleware,
  userController.deleteUser
);
router.get("/:userName/reach", userController.userReach);
// router.get("/:userName/tweets", userController.userTweets);
router.post(
  "/follow",
  userMiddleware.authenticationMiddleware,
  userController.userFollow
);
router.patch(
  "/updatePassword",
  userMiddleware.authenticationMiddleware,
  userController.updatePassword
);
router.patch(
  "/updateUsername",
  userMiddleware.authenticationMiddleware,
  userController.updateUsername
);
router.get("/search/:userName", userController.findUserBySearch);

module.exports = { userRouter: router };
