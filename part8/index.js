const { ApolloServer, gql } = require("apollo-server");
const mongoose = require("mongoose");
const Book = require("./models/book");
const Author = require("./models/author");

const MONGODB_URI =
  "mongodb+srv://arul:edu21390@cluster0.lrlnfis.mongodb.net/test";

console.log("connecting to", MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int!
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genres: String): [Book]
    allAuthors: [Author!]!
  }
  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book
  }
  type Mutation {
    editAuthor(name: String!, setBornTo: Int!): Author
  }
`;

const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (root, args) => {
      if (args) {
        const books = Book.find({});
        const filters = Object.entries(args);
        console.log(filters);
        return books.filter((book) => {
          return filters.every(([key, value]) => book[key].includes(value));
        });
      } else {
        return Book.find({});
      }
    },

    allAuthors: async (root, args) => {
      return Author.find({});
    },
  },
  Author: {
    name: (root) => root.name,
    born: (root) => root.born,
    id: (root) => root.id,
    bookCount: (root) => {
      counter = 0;
      for (var i = 0; i < books.length; i++) {
        if (books[i].author === root.name) {
          counter += 1;
        }
      }
      return counter;
    },
  },
  Mutation: {
    addBook: (root, args) => {
      const book = new Book({ ...args });

      authorNames = authors.map((author) => author.name);
      if (!authorNames.includes(book.author)) {
        const author = new Author({
          name: book.author,
          born: null,
          bookCount: 1,
        });

        author.save();
      }
      return book.save();
    },
    editAuthor: (root, args) => {
      const author = Author.findOne({ name: args.name });
      author.setBornTo = args.setBornTo;
      return author.save();
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
