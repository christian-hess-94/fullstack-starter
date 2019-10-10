import { gql } from 'apollo-boost';
export const readAllUsers =
    gql`{
        readAllUsers {
            username
            createdAt
            roles {
                name
            }
        }     
    }`