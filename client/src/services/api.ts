import axios from "axios";

import type { BookInterface } from "../interfaces/BookInterface";

const api = axios.create({
    baseURL: "http://localhost:3000",
});

export const bookService = {
    getAll: async (): Promise<BookInterface[]> => {
        const response = await api.get("/books");
        return response.data;
    },

    create: async (
        title: string,
        author: string,
        year: number
    ): Promise<BookInterface> => {
        const response = await api.post("/books", { title, author, year });
        return response.data;
    },

    remove: async (id: number): Promise<void> => {
        await api.delete(`/books/${id}`);
    },

    update: async (id: number, data: Partial<BookInterface>): Promise<void> => {
        await api.put(`/books/${id}`, data);
    },
};
