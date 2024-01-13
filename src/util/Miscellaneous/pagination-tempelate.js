const mongoose = require("mongoose");
const CustomError = require("../common/custom-error");

async function paginate(model, limit, page = 1, filter, sort) {
  try {
    const results = await model
      .find(filter)
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit * 1)
      .populate("user", "userName coverPhoto")
      .populate("likes", "users");
    return results;
  } catch (err) {
    console.error(err.message);
    throw new CustomError(err.message, 500, "Mongoose pagination");
  }
}
module.exports = paginate;
