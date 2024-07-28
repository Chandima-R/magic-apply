import { ApolloClient, InMemoryCache, split } from "@apollo/client";
import { HttpLink } from "@apollo/client/link/http";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";

const GRAPHQL_API_URL = process.env.NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT;

const authHeader = process.env.NEXT_PUBLIC_HASURA_GRAPHQL_SECRET_KEY || "";

const httpLink = new HttpLink({
  uri: GRAPHQL_API_URL,
  headers: {
    "x-hasura-admin-secret": authHeader,
  },
});

const wsLink = new WebSocketLink({
  uri: process.env.NEXT_PUBLIC_HASURA_GRAPHQL_WSS_ENDPOINT || "",
  options: {
    reconnect: true,
    lazy: true,
    connectionParams: {
      headers: {
        "x-hasura-admin-secret": authHeader,
      },
    },
  },
});

// @ts-ignore
const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export default client;
