const { gql } = require("apollo-server");

const BookTypeDef = gql`
  type Book {
    title: String
    author: String
  }

  extend type Query {
    books: [Book]
  }
`;

module.exports = {
    BookTypeDef
};
