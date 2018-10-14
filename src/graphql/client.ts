import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const API_BASE_URL = '/graphql';

const httpLink = new HttpLink({
  uri: API_BASE_URL,
  // headers: {
  //   authorization: `Bearer ${
  //     process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN
  //   }`,
  // },
});
const cache = new InMemoryCache();
const client = new ApolloClient({
  link: httpLink,
  cache,
});

export default client;