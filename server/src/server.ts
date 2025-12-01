import express = require("express");
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

const booksDB = [
    {
        bookId: 1,
        title: "O Senhor dos Anéis",
        author: "J.R.R. Tolkien",
        year: 1954,
    },
    {
        bookId: 2,
        title: "Dom Casmurro",
        author: "Machado de Assis",
        year: 1899,
    },
    { bookId: 3, title: "Clean Code", author: "Robert C. Martin", year: 2008 },
];

app.get("/books", (_req, res) => {


    return res.json(booksDB);
});

app.get("/", (_req, res) => {
    res.json({ message: "Backend on" });
});

app.post("/books/", function (req, res) {
    const { title, author, year } = req.body

    const newId = booksDB.length + 1

    const newBook = {
        bookId: newId,
        title: title,
        author: author,
        year: year
    }

    booksDB.push(newBook)

    res.status(201).json(newBook)
})

app.put("/books/:id", (req, res) => {
    const getId = Number(req.params.id)
    const { title, author, year } = req.body

    const book = booksDB.find((b) => b.bookId === getId)

    if (!book) {
        return res.status(404).json({ message: "Book not found" })
    }

    if (title) book.title = title;
    if (author) book.author = author;
    if (year) book.year = year

    return res.json(book)
})

app.delete("/books/:id", (req, res) => {
    const id = Number(req.params.id);

    const index = booksDB.findIndex((book) => book.bookId === id);

    if (index === -1) {
        return res.status(404).json({ message: "Book not found" });
    }

    booksDB.splice(index, 1);

    return res.json({ message: " Book deleted" });
});

app.listen(PORT, () => {
    console.log(`Servidor a rodar em http://localhost:${PORT}`);
});
