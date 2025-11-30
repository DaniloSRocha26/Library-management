// src/entities/Book.ts
import type { BookInterface } from "../../interfaces/BookInterface";
import type { OperationResult } from "../../interfaces/OperationResult";
import { BookStatus } from "../enums/BookStatus";

//Represents a physical book in the library system

export class Book implements BookInterface {
    private static nextId = 1;

    static setNextId(newId: number) {
        Book.nextId = newId;
    }

    readonly bookId: number;
    title: string;
    author: string;
    year: number;
    status: BookStatus;

    //Creates a new Book instance
    constructor(
        title: string,
        author: string,
        year: number,
        id?: number,
        status?: BookStatus
    ) {
        this.title = title.trim();
        this.author = author.trim();
        this.year = year;

        this.status = status || BookStatus.AVAILABLE;

        if (id) {
            this.bookId = id;

            if (id >= Book.nextId) {
                Book.nextId = id + 1;
            }
        } else {
            this.bookId = Book.nextId++;
        }
    }

    //Attempts to change the book status to BORROWED
    toLendSomeone(): OperationResult {
        if (this.status === BookStatus.AVAILABLE) {
            this.status = BookStatus.BORROWED;
            return {
                success: true,
                message: `"You borrowed: ${this.title}!"`,
            };
        } else {
            return {
                success: false,
                message: "The book has already been borrowed.",
            };
        }
    }

    //Attempts to return the book to the shelf (AVAILABLE)
    toReturn(): OperationResult {
        if (this.status === BookStatus.BORROWED) {
            this.status = BookStatus.AVAILABLE;
            return { success: true, message: `You returned: "${this.title}"` };
        } else {
            return {
                success: false,
                message: "You cannot return a book that is not borrowed.",
            };
        }
    }

    //Marks the book as UNAVAILABLE (lost/damaged)
    markAsUnavailable(): OperationResult {
        this.status = BookStatus.UNAVAILABLE;
        return {
            success: true,
            message: `Book marked as unavailable: "${this.title}"`,
        };
    }

    //Returns a plain object representation of the book
    getBookInfo() {
        return {
            id: this.bookId,
            title: this.title,
            author: this.author,
            year: this.year,
            status: this.status,
        };
    }

    toString(): string {
        return `[ID: ${this.bookId}] "${this.title}" by ${this.author} (${this.year}) → ${this.status}`;
    }
}
