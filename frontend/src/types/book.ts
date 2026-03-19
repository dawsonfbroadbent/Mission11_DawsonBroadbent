// Shared shape for book records returned by the API and rendered in the UI.
export type Book = {
    bookId: number;
    title: string;
    author: string;
    publisher: string;
    isbn: string;
    classification: string;
    category: string;
    pageCount: number;
    price: number;
};
