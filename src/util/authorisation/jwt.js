const jwt = require("jsonwebtoken");

const { StatusCodes } = require("http-status-codes");
const { customError } = require("../common");
require("dotenv").config();

async function tokenGenerate(data) {
  try {
    const { id, userName, expiryInSec } = data; //add suitable
    const token = await jwt.sign(
      { id: id, userName: userName },
      `${process.env.TOKEN_GENERATE_KEY}`,
      { expiresIn: `${expiryInSec}s` }
    );
    return token;
  } catch (error) {
    throw error;
  }
}

async function tokenVerify(token) {
  try {
    var decoded = await jwt.verify(token, `${process.env.TOKEN_GENERATE_KEY}`);
    if (!decoded) {
      console.error(
        new customError("Not a Valid Token", StatusCodes.UNAUTHORIZED)
      );
      return;
    }

    return decoded;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  tokenGenerate,
  tokenVerify,
};
