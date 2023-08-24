const mongoose = require("mongoose");
const validator = require("validator");

const postSchema = new mongoose.Schema({
  body: String,
  username: String,
  createdAt: String,
  comments: [
    {
      body: String,
      username: String,
      createdAt: String
    }
  ],
  likes: [
    {
      username: String,
      createdAt: String
    }
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  }
});

const posts = mongoose.model("posts", postSchema);

module.exports = posts;
