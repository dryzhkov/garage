import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { getAccessToken } from '../auth/Auth';

let _client = null;

const client = () => {
  if (!_client) {
    const httpLink = new HttpLink({
      uri:
        process.env.NODE_ENV === 'dev'
          ? '/graphql'
          : '/.netlify/functions/server/graphql',
      headers: {
        authorization: `Bearer ${getAccessToken()}`,
      },
    });
    const cache = new InMemoryCache();
    _client = new ApolloClient({
      link: httpLink,
      cache,
    });
  }

  return _client;
};

export default client;
