const { books } = require("./BookData");

class BookSource {
    static all() {
        return books;
    }
}

module.exports = {
    BookSource,
};
