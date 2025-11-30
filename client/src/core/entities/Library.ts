// src/entities/Library.ts

import type { BookInterface } from "../../interfaces/BookInterface";
import type { OperationResult } from "../../interfaces/OperationResult";
import { Book } from "./Book";
import { User } from "./User";

//The main controller of the Library Management System
export class Library {
    private books: BookInterface[] = [];
    private users: User[] = [];

    constructor() {
        const savedBooks = localStorage.getItem("my-library-data");

        if (savedBooks) {
            this.books = JSON.parse(savedBooks);

            if (this.books.length > 0) {
                const maxId = Math.max(...this.books.map((b) => b.bookId));
                Book.setNextId(maxId + 1);
            }
        } else {
            this.books = [];
        }
    }

    private save(): void {
        localStorage.setItem("my-library-data", JSON.stringify(this.books));
    }

    addBook(title: string, author: string, year: number): void {
        const newBook = new Book(title, author, year);
        this.books.push(newBook);
        this.save();
    }

    //Returns a copy of all books in the catalog.
    showAllBooks(): BookInterface[] {
        return this.books;
    }

    removeBook(id: number): OperationResult {
        const book = this.books.find((book) => book.bookId === id);
        if (!book) {
            return { success: false, message: `Book not found` };
        } else {
            this.books = this.books.filter((book) => book.bookId !== id);
            this.save();
            return { success: true, message: `Book deleted` };
        }
    }

    //Finds a book by its unique ID. Returns undefined if not found.
    findBookById(id: number): BookInterface | undefined {
        return this.books.find((book) => book.bookId === id);
    }

    // Filters books containing the partial string in the title
    searchByTitle(titlePart: string): BookInterface[] {
        const lower = titlePart.toLowerCase();
        return this.books.filter((book) =>
            book.title.toLowerCase().includes(lower)
        );
    }

    //Filters books containing the partial string in the author's name.
    searchByAuthor(authorPart: string): BookInterface[] {
        const lower = authorPart.toLowerCase();
        return this.books.filter((book) =>
            book.author.toLowerCase().includes(lower)
        );
    }

    /**
     * Orchestrates the borrowing process.
     * 1. Validates existence of Book and User.
     * 2. Checks User eligibility (limits).
     * 3. Updates Book status.
     * 4. Updates User history.
     */
    lendBook(_bookId: number, _userId: number): OperationResult {
        void _bookId;
        void _userId;
        return {
            success: false,
            message: "Lending is currently disabled to support LocalStorage.",
        };
    }

    /**
     * Orchestrates the return process.
     * Updates book status to Available and removes from User's history.
     */
    returnBook(_bookId: number, _userId: number): OperationResult {
        void _bookId;
        void _userId;
        return {
            success: false,
            message: "Returning is currently disabled to support LocalStorage.",
        };
    }

    //Removes a book from the system completely.

    //Updates specific fields of a book
    updateBook(
        bookId: number,
        newInfo: Partial<BookInterface>
    ): OperationResult {
        const book = this.findBookById(bookId);
        if (!book) {
            return { success: false, message: `Book not found` };
        }
        if (newInfo.title) {
            book.title = newInfo.title;
        }
        if (newInfo.author) {
            book.author = newInfo.author;
        }
        if (newInfo.year) {
            book.year = newInfo.year;
        }

        this.save();
        return { success: true, message: `Book updated successfully` };
    }

    //Prints the entire catalog to the console
    listAll(): void {
        if (this.books.length === 0) {
            console.log("The library is empty.");
            return;
        }
        console.log("\n=== LIBRARY CATALOG ===");
        this.books.forEach((book) => console.log(book.toString()));
        console.log("========================\n");
    }

    //Registers a new user in the system
    registerUser(
        name: string,
        email: string,
        phone: string,
        document: string
    ): User {
        const user = new User(name, email, phone, document);
        this.users.push(user);
        return user;
    }

    findUserById(id: number): User | undefined {
        return this.users.find((user) => user.userId === id);
    }
}
