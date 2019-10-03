const { ApolloServer, gql } = require("apollo-server");
const { BookTypeDef, BookResolvers } = require("./Book/BookModel");

const GeneralTypeDef = gql`
    type Query
`;

const server = new ApolloServer({
    typeDefs: [GeneralTypeDef, BookTypeDef],
    resolvers: [BookResolvers],
});

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
