import { gql } from '../_Default/node_modules/apollo-server-express';

const ConsagradoSchema = gql`
  extend type Query {
    createConsagrado: Consagrado
    readOneConsagrado(idConsagrado: ID!): Consagrado
    updateConsagrado(consagrado: InputConsagrado!): Boolean!
    deleteConsagrado(idConsagrado: ID!): Boolean!

    readAllConsagrados: [Consagrado!]
  }
  type Consagrado {
    usuario: String!
  }
`;