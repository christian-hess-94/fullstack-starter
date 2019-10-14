import gql from "graphql-tag";

const CacheSchema = gql`
  {
    visibilityFilter @client
  }
`;




export default CacheSchema