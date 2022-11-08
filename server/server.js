require("dotenv").config();

/**
 * after above runs
 * process.env should be populated with variables and values from .env file
 */

const path = require("path");
const express = require("express");
const db = require("./config/connection");

const { ApolloServer } = require("apollo-server-express");
const { resolvers, typeDefs } = rquire("./schemas");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

app.get("/", (req, res) => {
  console.log("Apollo GraphQL Express server is ready");
});

// app.listen({ port: PORT }, () => {
//   console.log(
//     `Server is running at http://localhost:8080${server.graphqlPath}`
//   );
// });

// Serve up static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

db.once("open", () => {
  app.listen(PORT, () => {
    console.log([
      `API server running on port ${PORT}`,
      `grapql served at http://localhost:${PORT}${server.graphqlPath}`,
    ]);
  });
});
