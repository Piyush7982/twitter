const { likeRepository } = require("../repository");
const likeRepo = new likeRepository();
async function createLike(like) {
  try {
    const { onModel, model, users } = like;
    const exist = await likeRepo.findByModel({
      onModel: onModel,
      model: model,
    });

    if (Boolean(exist)) {
      await toggleLike(exist, users);

      return exist;
    } else {
      const newLike = await likeRepo.create({
        onModel: onModel,
        model: model,
        count: 1,
        users: [users],
      });
      return newLike;
    }
  } catch (error) {
    throw error;
  }
}
async function getLikeByModel(like) {
  try {
    const { model, onModel } = like;
    const result = await likeRepo.findByModel({
      onModel: onModel,
      model: model,
    });
    if (!Boolean(result)) {
      throw new customError(
        "Like not found",
        StatusCodes.NOT_FOUND,
        "LikeNotFound"
      );
    }
    return result;
  } catch (error) {
    throw error;
  }
}
async function updateLike(like) {
  try {
    const { model, onModel, users } = like;
    const exist = await likeRepo.findByModel({
      onModel: onModel,
      model: model,
    });
    if (!Boolean(exist)) {
      throw new customError(
        "Like not found",
        StatusCodes.NOT_FOUND,
        "LikeNotFound"
      );
    } else {
      await toggleLike(exist, users);
      //
    }
  } catch (error) {
    throw error;
  }
}
async function toggleLike(like, users) {
  try {
    if (like.users.includes(users.toString())) {
      await likeRepo.update(like._id, {
        $pull: { users: users.toString() },
        count: like.count - 1,
      });
    } else {
      await likeRepo.update(like._id, {
        count: like.count + 1,

        $push: { users: users.toString() },
      });
    }
  } catch (error) {
    throw error;
  }
}
module.exports = {
  createLike,
  getLikeByModel,
  updateLike,
};
