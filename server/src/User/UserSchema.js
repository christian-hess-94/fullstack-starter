import { gql } from "apollo-server";

const userSchema = gql`
    extend type Query {
        users:[User!]
        me: User,
        user(id: ID!): User
    }
    extend type Mutation{
        turnUserIntoAdmin(username: String!): Boolean
        signUp(username: String!, email: String!, password: String!): Token!
        signIn(login: String!, password: String!): Token!
        deleteUser(id: ID!): Boolean!
    }

    type Token {
        token: String!
    }

    type User {
        id: ID!
        username: String! #SCALAR TYPE
        email: String! #SCALAR TYPE
        role: String
        createdAt: String
        updatedAt: String
    }
`

export default userSchema