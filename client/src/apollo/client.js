
import ApolloClient from 'apollo-boost';
const client = new ApolloClient({
    uri: 'http://172.25.147.202:8000/graphql',
});

export default client