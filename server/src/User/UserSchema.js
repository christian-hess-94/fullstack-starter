import { gql } from "apollo-server";

const UserSchema = gql`
    extend type Query {
        readAllUsers:[User!]
        loggedUser: User,
        readOneUser(id: ID!): User
    }
    extend type Mutation{
        createUser(username: String!, email: String!, password: String!): Token!
        login(login: String!, password: String!): Token!
        deleteUser(id: ID!): Boolean!
        addRoleToUser(userId: ID!, name: String!): Boolean
    }

    type Token {
        token: String!
    }

    type User {
        id: ID!
        username: String! #SCALAR TYPE
        email: String! #SCALAR TYPE
        roles: [Role!]
        createdAt: String
        updatedAt: String
    }
`

export default UserSchema