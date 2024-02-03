const { userService } = require("../service");
const {
  successResponse,
  errorResponse,
  customError,
} = require("../util/common");

async function signUp(req, res) {
  try {
    const user = await userService.createUser({
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
      coverPhoto: req?.file?.url,
    });
    successResponse.Data = user.userName;
    successResponse.Message = `User created successfully with email ${user.email}`;
    return res.status(successResponse.StatusCode).json(successResponse);
  } catch (error) {
    errorResponse.Message = "failed to create user";
    errorResponse.Error = { error: error.message, name: error.name };
    res.status(errorResponse.StatusCode).json(errorResponse);
  }
}
async function login(req, res) {
  try {
    const user = await userService.login({
      userName: req.body.userName,
      password: req.body.password,
    });
    const { username, id } = user;
    successResponse.Data = { username, id };
    successResponse.Message = "User logged in successfully";
    res.cookie("access_token", user.token, {
      // httpOnly: true,
      // sameSite: "strict",
      secure: true,
    });

    return res.status(successResponse.StatusCode).json(successResponse);
  } catch (error) {
    errorResponse.Message = "failed to login user";
    errorResponse.Error = { error: error.message, name: error.name };
    res.status(errorResponse.StatusCode).json(errorResponse);
  }
}
async function logout(req, res) {
  try {
    if (req.cookies.access_token) {
      res.clearCookie("access_token");
      successResponse.Data = "User Logged Out";
      successResponse.Message = "succesfully found";
      return res.status(successResponse.StatusCode).json(successResponse);
    } else {
      throw new customError(
        "User is not logged in",
        400,
        "Authentication Error"
      );
    }
  } catch (error) {
    errorResponse.Message = "failed to logout user";
    errorResponse.Error = { error: error.message, name: error.name };
    res.status(errorResponse.StatusCode).json(errorResponse);
  }
}
async function getUser(req, res) {
  try {
    const user = await userService.getUserDetails({
      userName: req.params.userName,
    });

    successResponse.Data = user;
    successResponse.Message = "succesfully found";
    return res.status(successResponse.StatusCode).json(successResponse);
  } catch (error) {
    errorResponse.Message = "failed to get user";
    errorResponse.Error = { error: error.message, name: error.name };
    res.status(errorResponse.StatusCode).json(errorResponse);
  }
}
async function deleteUser(req, res) {
  try {
    const user = await userService.deleteUser({
      userName: req.user.userName,
    });
    res.clearCookie("access_token");
    successResponse.Data = user;
    successResponse.Message = "succesfully deleted";
    return res.status(successResponse.StatusCode).json(successResponse);
  } catch (error) {
    errorResponse.Message = "failed to delete user";
    errorResponse.Error = { error: error.message, name: error.name };
    res.status(errorResponse.StatusCode).json(errorResponse);
  }
}
// async function userTweets(req, res) {
//   try {
//     const user = await userService.getTweetsByUser({
//       userName: req.params.userName,
//     });
//     successResponse.Data = user;
//     successResponse.Message = "succesfully found";
//     return res.status(successResponse.StatusCode).json(successResponse);
//   } catch (error) {
//     errorResponse.Message = "failed to get user tweets";
//     errorResponse.Error = { error: error.message, name: error.name };
//     res.json(errorResponse).status(errorResponse.StatusCode);
//   }
// }
async function userReach(req, res) {
  try {
    const user = await userService.getUsersReach({
      userName: req.params.userName,
    });
    successResponse.Data = user;
    successResponse.Message = "succesfully found";
    return res.status(successResponse.StatusCode).json(successResponse);
  } catch (error) {
    errorResponse.Message = "failed to get user reach";
    errorResponse.Error = { error: error.message, name: error.name };
    res.status(errorResponse.StatusCode).json(errorResponse);
  }
}
async function userFollow(req, res) {
  try {
    const user = {
      _id: req.user.id,
      userName: req.user.userName,
    };
    const userToFollow = {
      _id: req.body.id,
      userName: req.body.userName,
    };
    const data = {
      user,
      userToFollow,
    };
    const result = await userService.followUser(data);
    successResponse.Data = result;
    successResponse.Message = "succesfully followed/unfollowed";
    return res.status(successResponse.StatusCode).json(successResponse);
  } catch (error) {
    errorResponse.Message = "failed to follow/unfollow";
    errorResponse.Error = { error: error.message, name: error.name };
    res.status(errorResponse.StatusCode).json(errorResponse);
  }
}
async function updateUsername(req, res) {
  try {
    const result = await userService.updateUsername({
      id: req.user.id,
      newUserName: req.body.userName,
    });
    successResponse.Data = result;
    successResponse.Message = "succesfully updated";
    return res.status(successResponse.StatusCode).json(successResponse);
  } catch (error) {
    errorResponse.Message = "failed to update username";
    errorResponse.Error = { error: error.message, name: error.name };
    res.json(errorResponse).status(errorResponse.StatusCode);
  }
}
async function updatePassword(req, res) {
  try {
    const result = await userService.updatePassword({
      userName: req.user.userName,
      oldPassword: req.body.oldPassword,
      newPassword: req.body.newPassword,
    });
    successResponse.Data = result;
    successResponse.Message = "succesfully updated";
    return res.status(successResponse.StatusCode).json(successResponse);
  } catch (error) {
    errorResponse.Message = "failed to update password";
    errorResponse.Error = { error: error.message, name: error.name };
    res.json(errorResponse).status(errorResponse.StatusCode);
  }
}
async function findUserBySearch(req, res) {
  try {
    const result = await userService.searchUser({
      userName: req.params.userName,
      limit: req.query.limit,
      page: req.query.page,
    });
    successResponse.Data = result;
    successResponse.Message = "succesfully found";
    return res.status(successResponse.StatusCode).json(successResponse);
  } catch (error) {
    errorResponse.Message = "failed to find user";
    errorResponse.Error = { error: error.message, name: error.name };
    res.json(errorResponse).status(errorResponse.StatusCode);
  }
}
async function updateBio(req, res) {
  try {
    const result = await userService.updateBio({
      id: req.user.id,
      bio: req.body.bio,
    });
    successResponse.Data = result;
    successResponse.Message = "succesfully updated";
    return res.status(successResponse.StatusCode).json(successResponse);
  } catch (error) {
    errorResponse.Message = "failed to update bio";
    errorResponse.Error = { error: error.message, name: error.name };
    res.json(errorResponse).status(errorResponse.StatusCode);
  }
}
module.exports = {
  signUp,
  login,
  logout,
  getUser,
  deleteUser,
  userReach,
  userFollow,
  updateUsername,
  updatePassword,
  findUserBySearch,
  updateBio,
};
