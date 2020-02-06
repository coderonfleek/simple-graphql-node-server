const resolvers = {
  users: async (_, context) => {
    const { db } = await context();
    return db
      .collection("users")
      .find()
      .toArray();
  },
  user: async ({ id }, context) => {
    const { db } = await context();
    return db.collection("users").findOne({ id });
  },
  //Mutation resolvers
  editUser: async ({ id, name, email }, context) => {
    const { db } = await context();

    return db
      .collection("users")
      .findOneAndUpdate(
        { id },
        { $set: { name, email } },
        { returnOriginal: false }
      )
      .then(resp => resp.value);
  } /* ,
  posts: async (_, context) => {
    const { db } = await context();

    
        //If you pass your resolvers inside rootValue this === obj and all arguments shift one possition to ///the left. 
        //obj: the parent object of this property
    

    return db
      .collection("posts")
      .find({ author: this.id })
      .toArray();
  } */
};

module.exports = resolvers;
