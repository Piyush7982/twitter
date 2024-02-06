require("dotenv").config();
SERVER_CONFIG = {
  PORT: process.env.PORT,
  FRONTEND_URL: process.env.FRONTEND_URL,
};
module.exports = SERVER_CONFIG;
