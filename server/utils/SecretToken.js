require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.createSecretToken = (id,userName) => {
  return jwt.sign({ id ,userName}, process.env.JWT_SECRET_KEY , {
    expiresIn: 3 * 24 * 60 * 60,
  });
};