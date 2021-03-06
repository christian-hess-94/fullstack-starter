import { gql } from 'apollo-boost';
export const createNewUser =
    gql`
    mutation createUser($username: String! $email: String! $password: String!) {
        createUser(username: $username email: $email password: $password) {
            token
        }
    }
`