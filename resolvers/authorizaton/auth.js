const jwt = require("jsonwebtoken");
const bcrypty = require("bcryptjs");

const { secret } = require("../../models/configs/uri");
const user = require("../../models/user");

const { AuthenticationError } = require("apollo-server");
module.exports = context => {
  // verify token for forward auth forwarded a a user added from express
  const header = context.req.headers.authorization;
  if (header) {
    const token = header.split("Bearer ")[1];
    if (token) {
      try {
        let users = jwt.verify(token, secret);
        return users;
      } catch (err) {
        throw new AuthenticationError("invalid/expired token");
      }
    } else {
      throw new Error("auth token in non valid format");
    }
  } else {
    throw new Error("Auth Header not found or in wrong format");
  }
};
