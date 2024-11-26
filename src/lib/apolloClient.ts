import { ApolloClient, InMemoryCache } from "@apollo/client";

export const ApClient = new ApolloClient({
  uri: "http://localhost:8080/query",
  cache: new InMemoryCache(),
});
