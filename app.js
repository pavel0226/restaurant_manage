const mongoose = require("mongoose");
const { ApolloServer } = require("apollo-server");

const config = require("./models/configs/uri");

// typeddefs
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./resolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req })
});

// the app middleware

mongoose
  .connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(data => {
    server.listen(5000).then(data => {
      console.log("server running on " + data.url);
    });
  })
  .catch(err => {
    console.log("error connecting to server");
  });
