const gql = require("graphql-tag");
const { ApolloServer } = require("apollo-server");

module.exports = gql`
  type Posts {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
  }
  input RegisterInput {
    username: String!
    password: String!
    consfirmPassword: String!
    email: String!
    createdAt: String
  }
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String
  }
  type RegisterUser {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String
    password: String!
  }
  # return type for the gql server input for updating details
  input UpdateDetails {
    website: String!
    developerExp: String!
    bio: String!
  }
  type Food {
    id: String!
    name: String
    image: String
    category: String
    label: String
    price: String
    featured: String
    description: String
  }
  type updatesforUser {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String
    bio: String!
    website: String!
    developerExp: String!
  }
  type Query {
    # return a array of all the posts
    getPosts: [Posts]
    getPostById(postId: ID!): Posts!
    deletePostById(postId: ID!): String!
    getUserswithUs: [User]
    getServerData: [Food]
  }
  type Mutation {
    register(registerInput: RegisterInput): RegisterUser!
    Login(email: String!, password: String!): User!
    createPost(body: String!): Posts!
    createComment(body: String!): String!
    deleteAccount(userDelete: String): String!
    updateDetailsforLogInUser(updateDetails: UpdateDetails): updatesforUser!
    # header provided for authentications
  }
`;

// email is main part for every entry and exit in databse for all actions
