const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");
const graphqlHTTP = require("express-graphql");
const { buildSchema } = require("graphql");
const dotenv = require("dotenv");
const cors = require("cors");
const resolvers = require("./resolvers");

const schemaCode = fs.readFileSync("./schema.gql", "utf8");

dotenv.config();
const app = express();

// get PORT from server environment if available
const port = process.env.PORT || 4000;

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose
  .connect(process.env.MONGO_DB, {
    useFindAndModify: false,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

app.use(cors()); // setup cors

// Construct a schema, using GraphQL schema language
const schema = buildSchema(schemaCode);

app.get("/", (req, res) => res.send({ message: "Welcome to yipah api" }));

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true,
  })
);

app.all("*", (req, res) =>
  res.status(404).send({ message: "Route Not Found" })
);

app.listen(port, () =>
  console.log("Running a GraphQL API server at http://localhost:4000/graphql")
);
