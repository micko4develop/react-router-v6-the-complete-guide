const express = require("express");
const cors = require("cors");


const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.options('*', cors());

app.use(express.json());

let books = [
  {
    id: "gatsby",
    title: "The Great Gatsby",
    description:
      "F. Scott Fitzgerald’s third book, stands as the supreme achievement of his career.",
    price: 14.99,
  },
  {
    id: "kill",
    title: "To Kill a Mockingbird",
    description:
      "Set in the 1930’s, a young girl named Scout Finch sets out on a quest for justice in the face of racism and prejudice.",
    price: 9.99,
  },
  {
    id: "pride",
    title: "Pride and Prejudice",
    description:
      "A novel of manners by Jane Austen, first published in 1813. The story follows the main character, Elizabeth Bennet, as she deals with issues of manners, upbringing, morality, education, and marriage.",
    price: 12.5,
  },
  {
    id: "t",
    title: "1984",
    description:
      "A dystopian novel by George Orwell, set in Airstrip One, a province of the superstate Oceania in a world of perpetual war, omnipresent surveillance, and public manipulation.",
    price: 10.0,
  },
  {
    id: "farm",
    title: "Animal Farm",
    description:
      "A political fable by George Orwell, published in England on August 17, 1945. According to Orwell, the book reflects events leading up to the Russian Revolution of 1917 and then on into the Stalinist era of the Soviet Union.",
    price: 8.99,
  },
  {
    id: "catcher",
    title: "The Catcher in the Rye",
    description:
      "A novel by J.D. Salinger. A teenage boy’s experiences during a short period in his life in the late 1940s. The story is told from the perspective of a young man, Holden Caulfield.",
    price: 11.25,
  },
  {
    id: "brave",
    title: "Brave New World",
    description:
      "A novel written in 1931 by Aldous Huxley and published in 1932. Set in London of AD 2540, the novel anticipates developments in reproductive technology, sleep-learning, psychological manipulation, and classical conditioning.",
    price: 15.0,
  },
  {
    id: "hobbit",
    title: "The Hobbit",
    description:
      "A children's fantasy novel by J.R.R. Tolkien. The story is set in Middle-earth, a fictional world created by Tolkien. The main character, hobbit Bilbo Baggins, embarks on a quest to reclaim a treasure stolen by the dragon Smaug.",
    price: 16.5,
  },
  {
    id: "code",
    title: "The Da Vinci Code",
    description:
      "A mystery thriller novel by Dan Brown. The story follows Harvard professor Robert Langdon and Sophie Neveu, who decipher clues to unravel a mystery involving Leonardo da Vinci's artworks, the Illuminati, and a secret religious society.",
    price: 13.75,
  },
];

app.get("/books", (req, res) => res.json(books));

app.get("/books/:id", (req, res) => {
  const { id } = req.params;
  const book = books.find((book) => book.id === id);
  if (book) return res.json(book);
  res.status(400).send();
});

app.post("/books/new", (req, res) => {
  const { book } = req.body;
  let exists = books.some((bookFromArray) => bookFromArray.id === book.id);

  if (exists) return res.status(400).json({ ok: false });

  books.push(book);

  res.json(book);
});

app.post("/books/:id", (req, res) => {
  const { id } = req.params;
  const { book: updatedBook } = req.body;

  books = books.map((book) => (book.id === id ? updatedBook : book));

  res.json(books.find((book) => book.id === id));
});

app.delete("/books/:id", (req, res) => {
  const { id } = req.params;

  let exists = books.some((book) => book.id === id);
  if (!exists) return res.status(400).json({ ok: false });

  books.splice(
    books.findIndex(function (i) {
      return i.id === id;
    }),
    1
  );
  res.json(books);
});

let SERVER_PORT = 3001;
app.listen(SERVER_PORT, () =>
  console.log(`Server is listening on port: ${SERVER_PORT}`)
);
