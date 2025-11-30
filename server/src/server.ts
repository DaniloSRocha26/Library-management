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

app.get("/books", (req, res) => {
    console.log("Alguém pediu a lista de livros");

    res.json(booksDB);
});

app.get("/", (req, res) => {
    res.json({ message: "Olá! O Backend está vivo e funcionando" });
});

app.delete("/books/:id", (req, res) => {
    const id = Number(req.params.id);

    const index = booksDB.findIndex((book) => book.bookId === id);

    if (index === -1) {
        return res.status(404).json({ message: "Book not found" });
    }

    booksDB.splice(index, 1);

    res.json({ message: " Book deleted" });
});

app.listen(PORT, () => {
    console.log(`Servidor a rodar em http://localhost:${PORT}`);
});
