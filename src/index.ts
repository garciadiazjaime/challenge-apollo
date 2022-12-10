import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import UserAPI, { IUser } from "./user-api.js";

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
  type User {
    email: String
    name: String
    lastName: String
    Hacker: Hacker
    Partner: Partner
    Mentor: Mentor
  }

  type Partner {
    id: Int
    email: String
    name: String
    lastName: String

    website: String
    organization: String
    linkedin: String
    telegram: String
    twitter: String
    supportedBefore: String
    whySupport: String
    acceptRules: Boolean
    status: String
  }

  type Hacker {
    email: String
    name: String
    lastName: String

    website: String
    github: String
    linkedin: String
    softwareExperience: String
    ethereumExperience: String
    motivation: String
    builtBefore: String
    buildHackathon: String
    conduct: Boolean
    status: String
  }

  type Mentor {
    email: String
    name: String
    lastName: String

    website: String
    github: String
    linkedin: String
    telegram: String
    twitter: String
    softwareExperience: String
    ethereumExperience: String
    ethereumMentored: String
    whyMentor: String
    acceptRules: Boolean
    status: String
  }


  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    user(email: String!): User
    partner(email: String!): Partner
    hacker(email: String!): Hacker
    mentor(email: String!): Mentor
  }

  type Mutation {
    saveUser(
      email: String!,
      name: String,
      lastName: String,
    ): User

    savePartner(
      email: String!,
      name: String,
      lastName: String,

      website: String
      organization: String,
      linkedin: String,
      telegram: String,
      twitter: String,
      supportedBefore: String,
      whySupport: String,
      acceptRules: Boolean,
    ): Partner

    saveHacker(
      email: String!,
      name: String,
      lastName: String,

      website: String,
      github: String,
      linkedin: String,
      softwareExperience: String,
      ethereumExperience: String,
      motivation: String,
      builtBefore: String,
      buildHackathon: String,
      conduct: Boolean,
    ): Hacker

    saveMentor(
      email: String!,
      name: String,
      lastName: String,

      website: String,
      github: String,
      linkedin: String,
      telegram: String,
      twitter: String,
      softwareExperience: String,
      ethereumExperience: String,
      ethereumMentored: String,
      whyMentor: String,
      acceptRules: Boolean
    ): Mentor
  }
`;

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    user: async (_, { email, role }, { dataSources }) => {
      return dataSources.userAPI.findUser({ email });
    },
    partner: async (_, payload, { dataSources }) => {
      return dataSources.userAPI.findPartner(payload);
    },
    hacker: async (_, payload, { dataSources }) => {
      return dataSources.userAPI.findHacker(payload);
    },
    mentor: async (_, payload, { dataSources }) => {
      return dataSources.userAPI.findMentor(payload);
    },
  },
  Mutation: {
    saveUser: async (_, user: IUser, { dataSources }) => {
      return dataSources.userAPI.createOrUpdateUser(user);
    },
    savePartner: async (_, user: IUser, { dataSources }) => {
      return dataSources.userAPI.createOrUpdatePartner(user);
    },
    saveHacker: async (_, hacker, { dataSources }) => {
      return dataSources.userAPI.createOrUpdateHacker(hacker);
    },
    saveMentor: async (_, mentor, { dataSources }) => {
      return dataSources.userAPI.createOrUpdateMentor(mentor);
    },
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async () => {
    const { cache } = server;
    return {
      // We create new instances of our data sources with each request,
      // passing in our server's cache.
      dataSources: {
        userAPI: new UserAPI({ cache }),
      },
    };
  },
});

console.log(`🚀  Server ready at: ${url}`);
