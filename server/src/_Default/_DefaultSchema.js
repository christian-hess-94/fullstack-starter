import { gql } from 'apollo-server-express';

const DefaultSchema = gql`
    scalar Date
    type Query {
        _: Boolean!
    }
    type Mutation {
        _: Boolean!
    }
    type Subscription {
        _: Boolean!
    }
`;

export default DefaultSchema