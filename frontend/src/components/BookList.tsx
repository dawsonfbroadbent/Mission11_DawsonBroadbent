import { useEffect, useState } from 'react';
import type { Book } from '../types/book';
import Pagination from './Pagination';
import PageSizeSelector from './PageSizeSelector';

function BookList({selectedCategories}: {selectedCategories: string[]}) {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalBooks, setTotalBooks] = useState<number>(0);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const categoryParams = selectedCategories.map((c) => `categories=${encodeURIComponent(c)}`).join('&');

        const response = await fetch(
          `https://localhost:5000/api/Bookstore/AllBooks?pageSize=${pageSize}&pageNum=${pageNum}&sortOrder=${sortOrder}${selectedCategories.length ? `&${categoryParams}` : ''}`
        );
        const data = await response.json();
        setBooks(data.books);
        setTotalBooks(data.totalNumBooks);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, [pageSize, pageNum, sortOrder, selectedCategories]);

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

  return (
    <section className="container py-4 py-lg-5">
      <div className="card border-0 shadow-sm">
        <div className="card-body p-0">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 px-4 py-4 border-bottom bg-light">
            <div>
              <h2 className="h4 mb-1 text-dark">Bookstore Catalog</h2>
              <p className="mb-0 text-secondary">
                Browse the available titles in a clean, easy-to-read table layout.
              </p>
            </div>
            <div className="d-flex flex-wrap align-items-center gap-2">
              <span className="badge rounded-pill text-bg-primary fs-6 fw-semibold px-3 py-2">
                {totalBooks} Books
              </span>
              <div className="d-flex align-items-center gap-2">
                <label
                  htmlFor="sort-order"
                  className="form-label mb-0 fw-semibold text-secondary"
                >
                  Sort
                </label>
                <select
                  id="sort-order"
                  className="form-select form-select-sm w-auto"
                  value={sortOrder}
                  onChange={(e) =>
                    handleSortChange(e.target.value as 'asc' | 'desc')
                  }
                >
                  <option value="asc">Title: A-Z</option>
                  <option value="desc">Title: Z-A</option>
                </select>
              </div>
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th className="px-4 py-3 text-uppercase small text-secondary">
                    Title
                  </th>
                  <th className="py-3 text-uppercase small text-secondary">
                    Author
                  </th>
                  <th className="py-3 text-uppercase small text-secondary">
                    Publisher
                  </th>
                  <th className="py-3 text-uppercase small text-secondary">
                    ISBN
                  </th>
                  <th className="py-3 text-uppercase small text-secondary">
                    Classification
                  </th>
                  <th className="py-3 text-uppercase small text-secondary">
                    Category
                  </th>
                  <th className="py-3 text-uppercase small text-secondary">
                    Page Count
                  </th>
                  <th className="pe-4 py-3 text-uppercase small text-secondary">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {books.map((book) => (
                  <tr key={book.bookId}>
                    <td className="px-4 py-3 fw-semibold text-dark">
                      {book.title}
                    </td>
                    <td className="py-3">{book.author}</td>
                    <td className="py-3">{book.publisher}</td>
                    <td className="py-3 text-nowrap">{book.isbn}</td>
                    <td className="py-3">{book.classification}</td>
                    <td className="py-3">{book.category}</td>
                    <td className="py-3">{book.pageCount}</td>
                    <td className="pe-4 py-3 fw-semibold text-dark">
                      ${book.price.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card-footer bg-white border-top px-4 py-3">
          <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3">
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
  );
}

export default BookList;
