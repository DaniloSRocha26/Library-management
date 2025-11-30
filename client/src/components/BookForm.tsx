import { useState } from "react";
import type { BookInterface } from "../interfaces/BookInterface";

interface BookFormProps {
    onAddBook: (title: string, author: string, year: number) => void;
    onUpdateBook: (
        id: number,
        title: string,
        author: string,
        year: number
    ) => void;
    onCancel: () => void;
    editingBook: BookInterface | null;
}

export function BookForm({
    onAddBook,
    onUpdateBook,
    onCancel,
    editingBook,
}: BookFormProps) {
    const [title, setTitle] = useState(editingBook?.title || "");
    const [author, setAuthor] = useState(editingBook?.author || "");
    const [year, setYear] = useState(editingBook?.year || "");

    function handleSubmit() {
        if (!title || !author || !year) return;

        if (editingBook) {
            onUpdateBook(editingBook.bookId, title, author, Number(year));
        } else {
            onAddBook(title, author, Number(year));
        }

        setTitle("");
        setAuthor("");
        setYear("");
    }
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8 border">
            <h2 className="text-lg font-bold mb-4">
                {editingBook ? "Editar Livro" : "Novo Livro"}
            </h2>
            <div className="flex gap-2 flex-wrap">
                <input
                    placeholder="Título"
                    className="border p-2 rounded flex-1"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    placeholder="Autor"
                    className="border p-2 rounded flex-1"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                />
                <input
                    placeholder="Ano"
                    className="border p-2 rounded w-24"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                />
                <button
                    onClick={handleSubmit}
                    className={`bg-blue-600 hover:bg-blue-700 text-white p-2 px-6 rounded transition-colors ${
                        editingBook
                            ? "bg-green-600 hover:bg-green-700"
                            : "bg-blue-600 hover:bg-blue-700"
                    }`}
                >
                    {editingBook ? "Salvar" : "Cadastrar"}
                </button>

                {editingBook && (
                    <button
                        onClick={onCancel}
                        className="bg-gray-200 text-gray-700 hover:bg-gray-300 p-2 px-4 rounded"
                    >
                        Cancelar
                    </button>
                )}
            </div>
        </div>
    );
}
