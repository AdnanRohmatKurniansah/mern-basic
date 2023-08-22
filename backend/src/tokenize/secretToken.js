require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.createSecretToken = (id, email) => {
  return jwt.sign({ id, email }, process.env.SECRET_KEY, {
    expiresIn: 1 * 24 * 60 * 60,
  });
};