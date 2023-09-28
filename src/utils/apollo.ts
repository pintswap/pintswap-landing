import { ApolloClient, InMemoryCache } from '@apollo/client';

const cache = new InMemoryCache({});

export const getApolloClient = (endpoint: string) => {
  return new ApolloClient({
    uri: endpoint,
    cache,
  });
};
