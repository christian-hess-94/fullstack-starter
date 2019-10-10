import { gql } from "apollo-server-express";
import userSchema from "./User/UserSchema";


const defaultSchema = gql`
  scalar Date
  
  type Query{
    _:Boolean
  }
  type Mutation{
    _:Boolean
  }
  type Subscription{
    _:Boolean
  }
`;
export default [defaultSchema, userSchema]