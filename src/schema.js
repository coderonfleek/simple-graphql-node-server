const { buildSchema } = require("graphql");

const schema = buildSchema(`
    type Query {
        events: [Event!]!,
        event(id: Int!): Event!
    }

    type Mutation {
        editEvent(id: Int!, title: String!, description: String!): Event!
    }

    type Event {
        id: ID!,
        title: String!,
        description: String,
        date: String,
        attendants: [Person!]
    }

    type Person {
        id: ID!
        name: String!
        age: Int
    }
`);

module.exports = schema;
