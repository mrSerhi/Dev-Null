const bcript = require("bcryptjs");

const solt = bcript.genSaltSync(10);
const jwtPrivetKey = bcript.hashSync("secret596125", solt);

const encodedPass = "596125%2Fserg";
module.exports = {
  mongoURI: `mongodb+srv://serhii:${encodedPass}@cluster0-tczzi.mongodb.net/test?retryWrites=true`,
  jwtPrivetKey
};
