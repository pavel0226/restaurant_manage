const validator = require("validator");

module.exports.loginValidate = (email, password) => {
  let errors = {};
  if (!validator.isEmail(email)) {
    errors.email = "please provide a valid email";
  }
  if (password.trim().length == 0) {
    errors.password = "password did not matched";
  }
  return {
    errors
  };
};

module.exports.createPostvalidate = body => {
  const errors = {};
  if (body.length === 0) {
    errors.body = "body cannot be null";
  }
  return {
    errors
  };
};
