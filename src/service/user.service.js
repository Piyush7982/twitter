const { StatusCodes } = require("http-status-codes");
const { userRepository } = require("../repository");
const { customError } = require("../util/common");
const { bcrypt, jwt } = require("../util/authorisation");
const userRepo = new userRepository();
async function createUser(User) {
  try {
    const { userName, email, password, coverPhoto } = User;
    if (await userRepo.exists({ userName })) {
      throw new customError(
        "User with this username already exists",
        StatusCodes.BAD_REQUEST
      );
    }
    if (await userRepo.exists({ email })) {
      throw new customError(
        "User with this email already exists",
        StatusCodes.BAD_REQUEST,
        "Duplication error"
      );
    }
    const hashedPassword = await bcrypt.hashPassword(password);
    coverPhoto
      ? coverPhoto
      : "https://imgs.search.brave.com/FwFW8TQHcmshRLqp1U8AnFAKgtnBRwP0LkoplStAus0/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE2/MDgwMzIzNjQ4OTUt/MGRhNjdhZjM2Y2Qy/P3E9ODAmdz0xMDAw/JmF1dG89Zm9ybWF0/JmZpdD1jcm9wJml4/bGliPXJiLTQuMC4z/Jml4aWQ9TTN3eE1q/QTNmREI4TUh4bGVI/QnNiM0psTFdabFpX/UjhNVEY4Zkh4bGJu/d3dmSHg4Zkh3PQ";
    const user = await userRepo.create({
      userName,
      email,
      password: hashedPassword,
      coverPhoto,
    });
    return user;
  } catch (error) {
    throw error;
  }
}
async function getUserDetails(user) {
  try {
    const { userName } = user;
    const userDetail = await userRepo.getUserPrivateInfo({ userName });
    return userDetail;
  } catch (error) {
    throw error;
  }
}
async function deleteUser(user) {
  try {
    const { userName } = user;
    const exists = await userRepo.exists({ userName });
    if (!exists) {
      throw new customError("User does not exist", StatusCodes.BAD_REQUEST);
    }
    const deleted = await userRepo.deleteByUsername(userName);
    return deleted;
  } catch (error) {
    throw error;
  }
}
async function updatePassword(data) {
  try {
    const { userName, oldPassword, newPassword } = data;
    const user = await userRepo.getUserByCredential({ userName });

    if (!Boolean(user)) {
      throw new customError(
        "User with this email doesnot exists",
        StatusCodes.UNAUTHORIZED
      );
    }

    if (!(await bcrypt.verifyPassword(oldPassword, user.password))) {
      throw new customError("Incorrect Password", StatusCodes.UNAUTHORIZED);
    }
    const hashedPassword = await bcrypt.hashPassword(newPassword);
    const updateUser = await userRepo.update(user.id, {
      password: hashedPassword,
    });
    return updateUser;
  } catch (error) {
    throw error;
  }
}
async function login(userData) {
  try {
    const { userName, password } = userData;
    const user = await userRepo.getUserByCredential({ userName });

    if (!Boolean(user)) {
      throw new customError(
        "User with this username doesnot exists",
        StatusCodes.BAD_REQUEST,
        "Validation Error"
      );
    }

    if (!(await bcrypt.verifyPassword(password, user.password))) {
      throw new customError(
        "Incorrect Password",
        StatusCodes.UNAUTHORIZED,
        "Validation Error"
      );
    }
    const username = user.userName;
    const id = user._id;
    const token = await jwt.tokenGenerate({
      id: user._id,
      userName: userName,
      // expiryInSec: 60 * 60,
    });
    return { token, username, id };
  } catch (error) {
    throw error;
  }
}
async function getTweetsByUser(user) {
  try {
    const { userName } = user;
    if (!(await userRepo.exists({ userName }))) {
      throw new customError(
        "User with this username doesnot exists",
        StatusCodes.BAD_REQUEST
      );
    }
    const result = await userRepo.getTweetsByUserName({ userName });
    return result;
  } catch (error) {
    throw error;
  }
}
async function getUsersReach(user) {
  try {
    const { userName } = user;
    if (!(await userRepo.exists({ userName }))) {
      throw new customError(
        "User with this username doesnot exists",
        StatusCodes.BAD_REQUEST
      );
    }
    const followers = await userRepo.getFollowers({ userName });
    const following = await userRepo.getFollowing({ userName });
    const result = { followers, following };
    return result;
  } catch (error) {
    throw error;
  }
}
async function followUser(data) {
  try {
    const { user, userToFollow } = data;
    if (!(await userRepo.exists({ userName: userToFollow.userName }))) {
      throw new customError(
        "User with this username doesnot exists",
        StatusCodes.BAD_REQUEST
      );
    }
    const exists = await isFollowed(data);
    if (exists) {
      await userRepo.update(user._id, {
        $pull: { following: userToFollow._id.toString() },
      });
      await userRepo.update(userToFollow._id, {
        $pull: { followers: user._id.toString() },
      });
      //continue toogle
    } else {
      await userRepo.update(user._id, {
        $push: { following: userToFollow._id.toString() },
      });
      await userRepo.update(userToFollow._id, {
        $push: { followers: user._id.toString() },
      });
    }
  } catch (error) {
    throw error;
  }
}
async function isFollowed(data) {
  try {
    const { user, userToFollow } = data;
    const result = await userRepo.isFollowed({
      userId: user._id,
      userToFollowNAme: userToFollow.userName,
    });
    return result;
  } catch (error) {
    throw error;
  }
}
async function updateUsername(data) {
  try {
    const { id, newUserName } = data;
    const user = await userRepo.getUserByCredential({ newUserName });
    if (Boolean(user)) {
      throw new customError(
        "User with this userName  exists take differnt userName",
        StatusCodes.BAD_REQUEST
      );
    }
    const result = await userRepo.update(id, { userName: newUserName });
    return result;
  } catch (error) {
    throw error;
  }
}
async function searchUser(data) {
  try {
    const { userName, limit, page } = data;
    const result = await userRepo.findUserBySearch(userName, limit, page);
    return result;
  } catch (error) {
    throw error;
  }
}
async function updateBio(data) {
  try {
    const { id, bio } = data;
    const result = await userRepo.update(id, { bio });
    return result;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createUser,
  deleteUser,
  updatePassword,
  login,
  getTweetsByUser,
  getUsersReach,
  getUserDetails,
  followUser,
  updateUsername,
  searchUser,
  updateBio,
};
