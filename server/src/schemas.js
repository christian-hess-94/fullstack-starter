import { gql } from "apollo-server-express";
import UserSchema from "./User/UserSchema";
import RoleSchema from "./Role/RoleSchema";


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
const schemas = [defaultSchema, UserSchema, RoleSchema]
export default schemas