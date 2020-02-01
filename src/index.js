const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema");
const startDatabase = require("./database");
const expressPlayground = require("graphql-playground-middleware-express")
  .default;

// Create a context for holding contextual data (db info in this case)
const context = async () => {
  const db = await startDatabase();

  return { db };
};

const resolvers = {
  /* hello: () => {
    return "Hello Fikky";
  } */
  events: async (_, context) => {
    const { db } = await context();
    return db
      .collection("events")
      .find()
      .toArray();
  },
  event: async ({ id }, context) => {
    const { db } = await context();
    return db.collection("events").findOne({ id });
  },
  //Mutation resolvers
  editEvent: async ({ id, title, description }, context) => {
    const { db } = await context();

    return db
      .collection("events")
      .findOneAndUpdate(
        { id },
        { $set: { title, description } },
        { returnOriginal: false }
      )
      .then(resp => resp.value);
  }
};

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: resolvers,
    context
  })
);

//Graphql Playground route
app.get("/playground", expressPlayground({ endpoint: "/graphql" }));

app.listen(4000);

console.log(`🚀 Server ready at http://localhost:4000/graphql`);
