"use client";

import { ApolloProvider } from "@apollo/client";
import client from "@/utils/apolloClient";

// @ts-ignore
export const GraphqlProvider = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
