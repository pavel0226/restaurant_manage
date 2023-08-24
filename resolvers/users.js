const user = require("../models/user");
const posts = require("../models/posts");

const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const auth = require("./authorizaton/auth");

const path = require("path");

const { UserInputError } = require("apollo-server");

// custom errors
const { loginValidate } = require("../graphql/validate");

const secret = require("../models/configs/uri");

module.exports = {
  Mutation: {
    async Login(_, { email, password }, context, info) {
      try {
        const userpresent = await user.findOne({ email });
        const errorss = loginValidate(email, password);
        if (!userpresent) {
          errorss.genre = "please reguster first";
          throw new UserInputError("Please register first", errorss);
        }
        // require a hash password
        const comparePass = await bcryptjs.compare(
          password,
          userpresent.password
        );
        if (!comparePass) {
          errorss.password = "password is incorrect";
          throw new UserInputError("Wrong Password ", {
            passwordincorect: "password is incorrect",
            errorss
          });
        }
        const token = await jwt.sign(
          { id: userpresent.id, username: userpresent.username, password },
          secret.secret,
          { expiresIn: "2h" }
        );
        console.log(userpresent);
        return {
          id: userpresent._id,
          email: userpresent.email,
          username: userpresent.username,
          createdAt: userpresent.createdAt,
          token
        };
      } catch (err) {
        return err;
      }
    },
    async register(
      _,
      {
        registerInput: { username, password, consfirmPassword, email }
      },
      context,
      info
    ) {
      try {
        const userpresent = await user.findOne({ email });
        let usererrors = {};
        const user_check = await user.findOne({ username });
        if (username.length == 0) {
          usererrors.username = "the username is reserved or blank";
        }
        if (password !== consfirmPassword || password.length == 0) {
          usererrors.password =
            "the passwords did not matched or length is empty";
        }
        if (userpresent || email.length == 0) {
          usererrors.email = "the email is registred asshoole";
        }
        if (Object.keys(usererrors).length > 0) {
          throw new UserInputError("error there", usererrors);
        }
        const hashpassword = await bcryptjs.hash(password, 10);
        const newUser = new user({
          username,
          password: hashpassword,
          email,
          createdAt: new Date().toISOString()
        });
        const res = await newUser.save();
        const token = jwt.sign(
          {
            id: res.id,
            email: res.email,
            password: res.password
          },
          secret.secret,
          { expiresIn: "1h" }
        );
        return {
          ...res._doc,
          token,
          id: res._id,
          hash: hashpassword
        };
      } catch (err) {
        console.log(err);
        return err;
      }
    },
    async deleteAccount(_, { userDelete }, context, info) {
      const users = auth(context);
      try {
        let username = users.username;
        if (username) {
          let user_id = await user.findOne({ username });
          // console.log(user_id);
          // it should log out from the succwess on success delet
          if (user_id) {
            let idOFUser = user_id._id;
            let done = await user.findByIdAndRemove(idOFUser);
            // delete all corresponding posts
            const deleteDone = await posts.deleteMany({ username });
            // done dleeteion of posts
            return "the user is successfuxlly deleted with all the posts";
          } else {
            throw new Error("asshole");
          }
        } else {
          throw new UserInputError("AssHole Not dound usernmae man");
        }
      } catch (err) {
        const er = "The  user is already deleted";
        return er;
      }
    },
    async updateDetailsforLogInUser(
      _,
      {
        updateDetails: { website, developerExp, bio }
      },
      context,
      info
    ) {
      const updateUser = auth(context);
      try {
      } catch (e) {}
    }
  },
  Query: {
    async getUserswithUs() {
      // open for all
      try {
        const exists = user.find({});
        if (exists.length === 0) {
          throw new UserInputError("there are no useres with us right now");
        }
        return exists;
      } catch (err) {
        return err;
      }
    }
  }
};
