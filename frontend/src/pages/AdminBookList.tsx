import { useEffect, useRef, useState } from 'react';
import { Offcanvas } from 'bootstrap';
import type { Book } from '../types/book';
import Pagination from '../components/Pagination';
import PageSizeSelector from '../components/PageSizeSelector';
import BookCategoryFilter from '../components/BookCategoryFilter';
import Heading from '../components/Heading';
import '../styles/BookList.css';
import { deleteBook, fetchBooks } from '../api/BooksAPI';
import NewBookForm from '../components/NewBookForm';
import EditBookForm from '../components/EditBookForm';

function AdminBookList() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalBooks, setTotalBooks] = useState<number>(0);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [editingProject, setEditingProject] = useState<Book | null>(null);

  const offcanvasRef = useRef<HTMLDivElement>(null);

  const handleCloseFilters = () => {
    if (!offcanvasRef.current) return;
    Offcanvas.getOrCreateInstance(offcanvasRef.current).hide();
  };

  // Reset to page 1 whenever the category filters change
  useEffect(() => {
    setPageNum(1);
  }, [selectedCategories]);

  // Fetch books from the API whenever pagination, sort, or filters change
  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);
        const response = await fetchBooks(pageSize, pageNum, sortOrder, selectedCategories);
        setBooks(response.books);
        setTotalBooks(response.totalNumBooks);
        setError(null);
      } catch (error) {
        console.error('Error fetching books:', error);
        setError('Failed to load books. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    setLoading(true);
    loadBooks();
  }, [pageSize, pageNum, sortOrder, selectedCategories]);

  const handleDelete = async (bookId: number) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this book? This action cannot be undone.');
    if (!confirmDelete) return;

    try {
      await deleteBook(bookId);
      setBooks(books.filter((b) => b.bookId !== bookId));
      setTotalBooks((prev) => prev - 1);
    } catch (error) {
      console.error('Error deleting book:', (error as Error).message);
      setError((error as Error).message);
    }
  };

  const totalPages = Math.ceil(totalBooks / pageSize);

  const handlePageChange = (page: number) => {
    setPageNum(page);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setPageNum(1);
  };

  const handleSortChange = (order: 'asc' | 'desc') => {
    setSortOrder(order);
    setPageNum(1);
  };

  const reloadBooks = () => {
    fetchBooks(pageSize, pageNum, sortOrder, selectedCategories).then((response) => {
      setBooks(response.books);
      setTotalBooks(response.totalNumBooks);
    });
  };

  return (
    <div className='book-list-page'>
      <Heading />
      <div className='container py-4'>
        <div className='row g-4'>
          <div className='col-lg-2'>
            <button
              className='btn btn-outline-primary d-lg-none mb-3'
              type='button'
              data-bs-toggle='offcanvas'
              data-bs-target='#adminCategoryFilters'
              aria-controls='adminCategoryFilters'
            >
              Filters
            </button>

            <div
              className='offcanvas-lg offcanvas-start filter-offcanvas'
              tabIndex={-1}
              id='adminCategoryFilters'
              aria-labelledby='adminCategoryFiltersLabel'
              ref={offcanvasRef}
            >
              <div className='offcanvas-header border-bottom d-lg-none'>
                <h5 className='offcanvas-title fw-semibold' id='adminCategoryFiltersLabel'>
                  Categories
                </h5>
                <button
                  type='button'
                  className='btn-close'
                  aria-label='Close'
                  onClick={handleCloseFilters}
                />
              </div>

              <div className='offcanvas-body d-block p-0'>
                <div className='filter-sidebar'>
                  <BookCategoryFilter
                    selectedCategories={selectedCategories}
                    setSelectedCategories={setSelectedCategories}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className='col-lg-10'>
            {loading && <p>Loading books...</p>}
            {error && <p className='text-red-500'>Error loading books: {error}</p>}

            <section className='book-list-section'>
              <div className='card border-0 shadow-sm'>
                <div className='card-body p-0'>
                  <div className='d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 px-4 py-4 border-bottom bg-light'>
                    <div>
                      <h2 className='h4 mb-1 text-dark'>Admin Catalog</h2>
                      <p className='mb-0 text-secondary'>
                        Browse and edit the available titles in a clean, easy-to-read table layout.
                      </p>
                    </div>

                    {!showAddForm && (
                      <button
                        type='button'
                        className='btn btn-success btn-sm'
                        onClick={() => setShowAddForm(true)}
                      >
                        Add New Book
                      </button>
                    )}

                    <div className='d-flex flex-wrap align-items-center gap-2'>
                      <span className='badge rounded-pill text-bg-primary fs-6 fw-semibold px-3 py-2'>
                        {totalBooks} Books
                      </span>

                      <div className='d-flex align-items-center gap-2'>
                        <label
                          htmlFor='sort-order'
                          className='form-label mb-0 fw-semibold text-secondary'
                        >
                          Sort
                        </label>
                        <select
                          id='sort-order'
                          className='form-select form-select-sm w-auto'
                          value={sortOrder}
                          onChange={(e) =>
                            handleSortChange(e.target.value as 'asc' | 'desc')
                          }
                        >
                          <option value='asc'>Title: A-Z</option>
                          <option value='desc'>Title: Z-A</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {showAddForm && (
                    <div className='p-4 border-bottom'>
                      <NewBookForm
                        onBookAdded={() => {
                          setShowAddForm(false);
                          reloadBooks();
                        }}
                        onCancel={() => setShowAddForm(false)}
                      />
                    </div>
                  )}

                  {editingProject && (
                    <div className='p-4 border-bottom'>
                      <EditBookForm
                        book={editingProject}
                        onBookUpdated={() => {
                          setEditingProject(null);
                          reloadBooks();
                        }}
                        onCancel={() => setEditingProject(null)}
                      />
                    </div>
                  )}

                  <div className='table-responsive'>
                    <table className='table table-hover align-middle mb-0'>
                      <thead className='table-light'>
                        <tr>
                          <th className='px-4 py-3 text-uppercase small text-secondary'>Title</th>
                          <th className='py-3 text-uppercase small text-secondary'>Author</th>
                          <th className='py-3 text-uppercase small text-secondary'>Publisher</th>
                          <th className='py-3 text-uppercase small text-secondary'>ISBN</th>
                          <th className='py-3 text-uppercase small text-secondary'>Classification</th>
                          <th className='py-3 text-uppercase small text-secondary'>Category</th>
                          <th className='py-3 text-uppercase small text-secondary'>Page Count</th>
                          <th className='py-3 text-uppercase small text-secondary'>Price</th>
                          <th className='pe-4 py-3 text-uppercase small text-secondary'>Action</th>
                        </tr>
                      </thead>

                      <tbody>
                        {books.map((book) => (
                          <tr key={book.bookId}>
                            <td className='px-4 py-3 fw-semibold text-dark'>{book.title}</td>
                            <td className='py-3'>{book.author}</td>
                            <td className='py-3'>{book.publisher}</td>
                            <td className='py-3 text-nowrap'>{book.isbn}</td>
                            <td className='py-3'>{book.classification}</td>
                            <td className='py-3'>{book.category}</td>
                            <td className='py-3'>{book.pageCount}</td>
                            <td className='py-3 fw-semibold text-dark'>${book.price.toFixed(2)}</td>
                            <td className='pe-4 py-3'>
                              <button
                                type='button'
                                className='btn btn-primary btn-sm me-2'
                                onClick={() => setEditingProject(book)}
                              >
                                Edit
                              </button>
                              <button
                                type='button'
                                className='btn btn-danger btn-sm'
                                onClick={() => handleDelete(book.bookId)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className='card-footer bg-white border-top px-4 py-3'>
                  <div className='d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3'>
                    <PageSizeSelector
                      pageSize={pageSize}
                      onPageSizeChange={handlePageSizeChange}
                    />

                    <Pagination
                      pageNum={pageNum}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                    />
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminBookList;
