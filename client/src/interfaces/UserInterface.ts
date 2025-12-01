import type { BookInterface } from "./BookInterface"

//Defines the public data structure of a User.
export interface UserInterface {
    name: string
    email: string
    phone: string
    document: string
    borrowedBooks: BookInterface[]
}