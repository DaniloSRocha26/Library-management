import type { BookInterface } from "../interfaces/BookInterface";

interface BookCardProps {
    book: BookInterface;
    onDelete: (id: number) => void;
    onEdit: (book: BookInterface) => void;
}

export function BookCard({ book, onDelete, onEdit }: BookCardProps) {
    return (
        <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-blue-500 flex flex-col justify-between">
            <div>
                <h3 className="text-xl font-bold text-gray-800">
                    {book.title}
                </h3>
                <p className="text-gray-600 mt-1">
                    {book.author}{" "}
                    <span className="text-gray-400 text-sm">{book.year}</span>
                </p>
            </div>

            <button
                onClick={() => onEdit(book)}
                className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200 py-1 px-3 rounded text-sm font-medium transition-colors"
            >
                Editar
            </button>
            <button
                onClick={() => onDelete(book.bookId)}
                className="mt-4 bg-red-100 text-red-600 hover:bg-red-200 py-1 px-3 rounded text-sm font-medium transition-colors self-start"
            >
                Remover
            </button>
        </div>
    );
}
