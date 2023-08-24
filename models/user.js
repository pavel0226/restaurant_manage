const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (value.length === 0) {
        console.log("err username is not empty");
      }
    }
  },
  password: String,
  email: String,
  createdAt: String
});

const users = mongoose.model("users", userSchema);

module.exports = users;
