
import ApolloClient from 'apollo-boost';
import CacheSchema from './cache/CacheSchema';
const client = new ApolloClient({
    uri: 'http://localhost:8000/graphql',
    typeDefs: CacheSchema
});

export default client