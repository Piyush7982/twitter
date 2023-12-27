const bcrypt = require("bcrypt");
const saltRounds = 6;

async function hashPassword(plainPassword) {
  const hashedPass = await bcrypt.hashSync(plainPassword, saltRounds);
  return hashedPass;
}
async function verifyPassword(plainPassword, encryptedPass) {
  const result = await bcrypt.compareSync(plainPassword, encryptedPass);
  return result;
}
module.exports = {
  hashPassword,
  verifyPassword,
};
