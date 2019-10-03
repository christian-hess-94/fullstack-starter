const { BookSource } = require("./BookSource");

const BookResolvers = {
    Query: {
        books: () => BookSource.all(),
    },
};

module.exports = {
    BookResolvers,
}
