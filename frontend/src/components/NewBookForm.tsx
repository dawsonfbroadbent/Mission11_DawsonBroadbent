import { useState } from 'react';
import type { Book } from '../types/book';
import { addBook } from '../api/BooksAPI';



interface NewBookFormProps {
    onBookAdded: (book: Book) => void;
    onCancel: () => void;
}

const NewBookForm = ({ onBookAdded, onCancel }: NewBookFormProps) => {
    const [formData, setFormData] = useState<Book>({
        bookId: 0,
        title: '',
        author: '',
        publisher: '',
        isbn: '',
        classification: '',
        category: '',
        pageCount: 0,
        price: 0,
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(formData => ({ ...formData, [name]: value }));
    };

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        await addBook(formData);
        onBookAdded(formData);
    };


    return (
        <form onSubmit={handleSubmit}>
            <h5 className="mb-3 fw-semibold">Add a Book</h5>
            <div className="row g-3">
                <div className="col-md-6">
                    <label htmlFor="title" className="form-label fw-semibold text-secondary small text-uppercase">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        className="form-control form-control-sm"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="col-md-6">
                    <label htmlFor="author" className="form-label fw-semibold text-secondary small text-uppercase">Author</label>
                    <input
                        type="text"
                        id="author"
                        name="author"
                        className="form-control form-control-sm"
                        value={formData.author}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="col-md-6">
                    <label htmlFor="publisher" className="form-label fw-semibold text-secondary small text-uppercase">Publisher</label>
                    <input
                        type="text"
                        id="publisher"
                        name="publisher"
                        className="form-control form-control-sm"
                        value={formData.publisher}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-md-6">
                    <label htmlFor="isbn" className="form-label fw-semibold text-secondary small text-uppercase">ISBN</label>
                    <input
                        type="text"
                        id="isbn"
                        name="isbn"
                        className="form-control form-control-sm"
                        value={formData.isbn}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-md-4">
                    <label htmlFor="classification" className="form-label fw-semibold text-secondary small text-uppercase">Classification</label>
                    <input
                        type="text"
                        id="classification"
                        name="classification"
                        className="form-control form-control-sm"
                        value={formData.classification}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-md-4">
                    <label htmlFor="category" className="form-label fw-semibold text-secondary small text-uppercase">Category</label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        className="form-control form-control-sm"
                        value={formData.category}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-md-2">
                    <label htmlFor="pageCount" className="form-label fw-semibold text-secondary small text-uppercase">Pages</label>
                    <input
                        type="number"
                        id="pageCount"
                        name="pageCount"
                        className="form-control form-control-sm"
                        value={formData.pageCount}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-md-2">
                    <label htmlFor="price" className="form-label fw-semibold text-secondary small text-uppercase">Price</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        className="form-control form-control-sm"
                        value={formData.price}
                        onChange={handleChange}
                        step="0.01"
                    />
                </div>
                <div className="col-12 d-flex gap-2 pt-1">
                    <button type="submit" className="btn btn-success btn-sm">Add Book</button>
                    <button type="button" className="btn btn-outline-secondary btn-sm" onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </form>
    );
};

export default NewBookForm;
