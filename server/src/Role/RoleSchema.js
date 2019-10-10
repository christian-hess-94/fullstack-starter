import { gql } from "apollo-server";

const RoleSchema = gql`
    extend type Query {
        readAllRoles:[Role!]
        readOneRole(id: ID!): Role
    }
    extend type Mutation{
        createRole(name: String!): Boolean!
        updateRole(id: ID!, newName: String!): Boolean!
        deleteRole(id: ID!): Boolean!
    }

    type Role {
        id: ID!
        name: String!
        createdAt: String
        updatedAt: String
    }
`

export default RoleSchema