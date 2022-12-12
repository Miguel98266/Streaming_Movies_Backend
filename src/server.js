// Global configurations about Graphql Core functionality
import { GraphQLServer } from "graphql-yoga";
import resolvers from "./graphql/resolvers";
import database from "./config/database";
import path from "path";
import config from "./config";
database();

export const server = new GraphQLServer({
  typeDefs: path.join(__dirname, "graphql/schema.graphql"),
  resolvers,
});
const port = config.server.port;
server.start({ port }, ({ port }) => {
  console.log("Server running!!");
});
