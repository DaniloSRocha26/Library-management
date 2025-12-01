import { useEffect, useState } from "react";
import { bookService } from "./services/api";
import { BookCard } from "./components/BookCard";
import { BookForm } from "./components/BookForm";
import type { BookInterface } from "./interfaces/BookInterface";

function App() {
    const [books, setBooks] = useState<BookInterface[]>([]);
    const [bookToEdit, setBookToEdit] = useState<BookInterface | null>(null);

    useEffect(() => {
        async function loadBooks() {
            try {
                const data = await bookService.getAll();
                setBooks(data);
            } catch (error) {
                console.error("Erro ao carregar livros:", error);
            }
        }
        loadBooks();
    }, []);

    async function refreshBooks() {
        try {
            const data = await bookService.getAll();
            setBooks(data);
        } catch (error) {
            console.error("Erro ao atualizar lista:", error);
        }
    }
    async function handleAddBook(title: string, author: string, year: number) {
        try {
            await bookService.create(title, author, year);
            refreshBooks();
        } catch (error) {
            console.error("Error creating:", error);
        }
    }

    async function handleRemove(id: number) {
        try {
            await bookService.remove(id);
            refreshBooks();

            if (bookToEdit && bookToEdit.bookId === id) {
                setBookToEdit(null);
            }
        } catch (error) {
            console.error("Error removing:", error);
        }
    }

    function handleEditBook(book: BookInterface) {
        setBookToEdit(book);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    async function handleUpdateBook(
        id: number,
        title: string,
        author: string,
        year: number
    ) {
        if (!bookToEdit) {
            alert("Erro: nenhum livro selecionado para edição");
            return;
        }

        try {
            const updates: Partial<BookInterface> = {};

            if (title !== bookToEdit.title) updates.title = title;
            if (author !== bookToEdit.author) updates.author = author;
            if (year !== bookToEdit.year) updates.year = year;

            if (Object.keys(updates).length === 0) {
                setBookToEdit(null);
                return;
            }


            await bookService.update(id, updates);

            setBookToEdit(null);
            refreshBooks();
        } catch (error) {
            console.error("Erro ao atualizar livro:", error);
            alert("Erro ao salvar as alterações");
        }
    }
    function handleCancel() {
        setBookToEdit(null);
    }

    return (
        <div className="p-10 min-h-screen bg-gray-50">
            <h1 className="text-3xl font-bold mb-8 text-blue-600">
                My Library (API Connected)
            </h1>

            <BookForm
                onAddBook={handleAddBook}
                onUpdateBook={handleUpdateBook}
                onCancel={handleCancel}
                editingBook={bookToEdit}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {books.map((book) => (
                    <BookCard
                        key={book.bookId}
                        book={book}
                        onDelete={handleRemove}
                        onEdit={handleEditBook}
                    />
                ))}
            </div>
        </div>
    );
}

export default App;
