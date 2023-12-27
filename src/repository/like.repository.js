const crud = require("./crud.repository");

const { Like } = require("../model");
const { customError } = require("../util/common");
const { StatusCodes } = require("http-status-codes");
class likeRepository extends crud {
  constructor() {
    super(Like);
  }
  async findByModel(content) {
    try {
      const like = await this.model.findOne(content);
      return like;
    } catch (error) {
      throw new customError(error.message, StatusCodes.BAD_REQUEST, error.name);
    }
  }
}
module.exports = likeRepository;
