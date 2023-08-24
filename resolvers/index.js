const { gql } = require("apollo-server");

const userResolvers = require("./users");
const postResolvers = require("./posts");

module.exports = {
  Query: {
    ...postResolvers.Query,
    ...userResolvers.Query
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...postResolvers.Mutation
  }
};
