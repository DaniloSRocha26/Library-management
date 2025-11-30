/** Represents the current physical condition of a book in the library */

export enum BookStatus {
    // Available for borrowing
    AVAILABLE = "Available",

    // The book is currently held by a user
    BORROWED = "Borrowed",

    // Book is lost, damaged or undergoing maintenance
    UNAVAILABLE = "Unavailable",
}
