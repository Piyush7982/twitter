const express = require("express");
const router = express.Router();
const { userController } = require("../../controller");
const { userMiddleware, multerMiddlware } = require("../../middleware");

router.post(
  "/signup",
  multerMiddlware.imageUploadMiddleware,
  userController.signUp
);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/checkAuth", userController.checkIsAuthenticated);
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

router.patch(
  "/updateBio",
  userMiddleware.authenticationMiddleware,
  userController.updateBio
);

module.exports = { userRouter: router };
