const { StatusCodes } = require("http-status-codes");
const { customError } = require("../util/common");

class crudRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    try {
      const entity = await this.model.create(data);
      return entity;
    } catch (error) {
      console.error("in crud repository:create");
      throw new customError(error.message, StatusCodes.BAD_REQUEST, error.name);
    }
  }

  async findOne(id) {
    try {
      const entity = await this.model.findById(id);
      return entity;
    } catch (error) {
      console.error("in crud repository");
      throw new customError(error.message, StatusCodes.BAD_REQUEST, error.name);
    }
  }

  async findAll() {
    try {
      const entity = await this.model.find({});
      return entity;
    } catch (error) {
      console.error("in crud repository");
      throw new customError(error.message, StatusCodes.BAD_REQUEST, error.name);
    }
  }

  async update(id, data) {
    try {
      const entity = await this.model.findByIdAndUpdate(id, data, {
        new: true,
      });
      return entity;
    } catch (error) {
      console.error("in crud repository");
      throw new customError(error.message, StatusCodes.BAD_REQUEST, error.name);
    }
  }

  async delete(id) {
    try {
      const entity = await this.model.findByIdAndDelete(id);
      return entity;
    } catch (error) {
      console.error("in crud repository");
      throw new customError(error.message, StatusCodes.BAD_REQUEST, error.name);
    }
  }
}
module.exports = crudRepository;
