const { gql } = require("apollo-server");
const posts = require("../models/posts");

const { UserInputError, AuthenticationError } = require("apollo-server");
const auth = require("./authorizaton/auth");

module.exports = {
  Mutation: {
    async createPost(_, { body }, context, info) {
      const user = auth(context);
      console.log("the user is");
      try {
        if (body.trim().length === 0) {
          throw new UserInputError("the body length cannot be empty");
        }
        const newPosts = new posts({
          body,
          user: user.id,
          username: user.username,
          createdAt: new Date().toISOString()
        });
        await newPosts.save();
        return newPosts;
      } catch (err) {
        console.log(err);
        return err;
      }
    },
    async createComment(_, { body }, context, info) {
      const user = auth(context);
      try {
        if (!body) {
          throw new UserInputError("the body of comment cannot be empty");
        }
        const msg = "hello now commenting";
        return msg;
      } catch (err) {
        const err = "connecting errpr";
        return err;
      }
    }
  },
  Query: {
    async deletePostById(_, { postId }, context, info) {
      const user = auth(context);
      console.log(user);
      try {
        const recentpost = await posts.findById(postId);
        if (recentpost === null) {
          throw new UserInputError("sorry the post does not exists");
        }
        if (postId.length === 0) {
          throw new UserInputError("the post id cannot be empty");
        }
        if (user.username === recentpost.username) {
          if (!recentpost) {
            console.log("err while deleting th post");
            throw new UserInputError("the post does not exist");
          }
          await posts.findByIdAndDelete(postId);
          const msg = `the required post with id  ${postId} is successfully deleted`;
          return msg;
        } else {
          throw new AuthenticationError("Not allowed to do so");
        }
      } catch (err) {
        return err;
      }
    },
    async getPosts() {
      try {
        const body = await posts.find({});
        return body;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getPostById(_, { postId }, context, info) {
      try {
        const _data = await posts.findById(postId);
        if (!_data) {
          throw new UserInputError("the id post not found", {
            errorss: "the id post not found"
          });
        }
        return {
          id: _data._id,
          ..._data._doc
        };
      } catch (err) {
        return err;
      }
    }
  }
};
