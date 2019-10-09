import { gql } from '../_Default/node_modules/apollo-server-express';

const UsuarioSchema = gql`
    extend type Query {
        createUsuario: Usuario
        readOneUsuario(idUsuario: ID!): Usuario
        updateUsuario(Usuario: InputUsuario!): Boolean!
        deleteUsuario(idUsuario: ID!): Boolean!

        readAllUsuarios: [Usuario!]
    }
    type Usuario {
        usuario: String!
    }
`;