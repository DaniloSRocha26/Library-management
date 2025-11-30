import type { OperationResult } from "../../interfaces/OperationResult";
import type { UserInterface } from "../../interfaces/UserInterface";
import type { BookInterface } from "../../interfaces/BookInterface";



//Represents a library member/user
export class User implements UserInterface {
    private static nextUserId: number = 1;
    private _name: string;
    private _email: string;
    private _phone: string;
    private _document: string;
    // Stores the list of books currently held by the user
    private _borrowedBooks: BookInterface[] = [];
    readonly userId: number;

    constructor(name: string, email: string, phone: string, document: string) {
        this._name = name;
        this._email = email;
        this._phone = phone;
        this._document = document;

        this.userId = User.nextUserId;
        User.nextUserId++;
    }

    get name(): string {
        return this._name
    }

    get email(): string {
        return this._email
    }

    get phone(): string {
        return this._phone
    }

    get document(): string {
        return this._document
    }

    //Returns the list of books the user is currently holding.
    get borrowedBooks(): BookInterface[] {
        return this._borrowedBooks
    }

    //Adds a book to the user's history list
    addBookToHistory(book: BookInterface): void {
        this._borrowedBooks.push(book)
    }

    //Removes a book from the user's history list based on ID
    removeBookFromHistory(book: BookInterface): void {
        this._borrowedBooks = this._borrowedBooks.filter(b => b.bookId !== book.bookId)
    }


    //Validates if the user is allowed to borrow a new book
    canBorrow(_book: BookInterface): OperationResult {
        console.log("Verificando elegibilidade para livro:", _book.title);
        if (this.borrowedBooks.length > 2) {
            return { success: false, message: `The user ${this.name} cannot borrow any more books. ` }
        }



        return {
            success: true,
            message: "User is eligible to borrow"
        }
    }
}
