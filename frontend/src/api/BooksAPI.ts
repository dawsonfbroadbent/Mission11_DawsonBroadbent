import type { Book } from '../types/book';

interface FetchBooksResponse {
    books: Book[];
    totalNumBooks: number;
}

const API_BASE_URL = 'https://dawsonbroadbent-mission13-backend-aqdkbyg2a7hhdbgq.francecentral-01.azurewebsites.net/api/Bookstore';

export const fetchBooks = async (
    pageSize: number,
    pageNum: number,
    sortOrder: 'asc' | 'desc',
    selectedCategories: string[]
): Promise<FetchBooksResponse> => {
    try {
        const categoryParams = selectedCategories
            .map((c) => `categories=${encodeURIComponent(c)}`)
            .join('&');

        const response = await fetch(
            `${API_BASE_URL}/AllBooks?pageSize=${pageSize}&pageNum=${pageNum}&sortOrder=${sortOrder}${
                selectedCategories.length ? `&${categoryParams}` : ''
            }`
        );

        if (!response.ok) {
            throw new Error('Failed to fetch books');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching books:', error);
        throw error;
    }
}

export const addBook = async (newBook: Book): Promise<Book> => {
    try {
        const response = await fetch(`${API_BASE_URL}/AddBook`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newBook),
        });

        if (!response.ok) {
            throw new Error('Failed to add book');
        }

        return await response.json();

    } catch (error) {
        console.error('Error adding book:', error);
        throw error;
    }
}

export const updateBook = async (bookId: number, updatedBook: Book): Promise<Book> => {
    try {
        const response = await fetch(`${API_BASE_URL}/UpdateBook/${bookId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedBook),
        });

        if (!response.ok) {
            throw new Error('Failed to update book');
        }

        return await response.json();
    } catch (error) {
        console.error('Error updating book:', error);
        throw error;
    }
};

export const deleteBook = async (bookId: number): Promise<void> => {
    try {
        const response = await fetch(`${API_BASE_URL}/DeleteBook/${bookId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Failed to delete book');
        }
    } catch (error) {
        console.error('Error deleting book:', error);
        throw error;
    }
}