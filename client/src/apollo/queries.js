import { gql } from 'apollo-boost';
export const readAllUsers =
    gql`{
        readAllUsers {
            username
            email
            createdAt
            roles {
                name
            }
        }     
    }`