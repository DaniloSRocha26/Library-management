import type { BookStatus } from "../core/enums/BookStatus";

//Defines the public data structure of a Book
export interface BookInterface {
    bookId: number
    title: string
    author: string
    year: number
    status: BookStatus
}