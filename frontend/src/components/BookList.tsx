import { useEffect, useState } from 'react';
import type { Book } from '../types/book';
import type { CartItem } from '../types/cartItem';
import { fetchBooks } from '../api/BooksAPI';
import Pagination from './Pagination';
import PageSizeSelector from './PageSizeSelector';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import '../styles/BookList.css';

// Displays a paginated, sortable table of books with add-to-cart controls.
// Accepts selectedCategories to filter the results from the API.
function BookList({ selectedCategories }: { selectedCategories: string[] }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalBooks, setTotalBooks] = useState<number>(0);
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const { addToCart } = useCart();
  const navigate = useNavigate();

  // Reset to page 1 whenever the category filters change
  useEffect(() => {
    setPageNum(1);
  }, [selectedCategories]);

  // Fetch books from the API whenever pagination, sort, or filters change
  useEffect(() => {
    const loadBooks = async () => {
      try {
        const data = await fetchBooks(pageSize, pageNum, sortOrder, selectedCategories);
        setBooks(data.books);
        setTotalBooks(data.totalNumBooks);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    loadBooks();
  }, [pageSize, pageNum, sortOrder, selectedCategories]);

  // Adjusts the local quantity selector for a given book (before adding to cart)
  const updateQuantity = (bookId: number, change: number) => {
    setQuantities((prev) => {
      const current = prev[bookId] ?? 0;
      const next = Math.max(0, current + change);

      return {
        ...prev,
        [bookId]: next,
      };
    });
  };

  // Builds a CartItem from the selected book and quantity, then navigates to the cart
  const handleAddToCart = (book: Book) => {
    const quantity = quantities[book.bookId] ?? 0;

    if (quantity === 0) return;

    const newItem: CartItem = {
      bookId: book.bookId,
      title: book.title,
      quantity,
      price: book.price,
    };

    addToCart(newItem);
    navigate('/cart', {
      state: {
        toastMessage: `${quantity} ${quantity > 1 ? 'copies' : 'copy'} of "${book.title}" added to cart.`,
      },
    });
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

  return (
    <section className='book-list-section'>
      <div className='card border-0 shadow-sm'>
        <div className='card-body p-0'>
          <div className='d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 px-4 py-4 border-bottom bg-light'>
            <div>
              <h2 className='h4 mb-1 text-dark'>Bookstore Catalog</h2>
              <p className='mb-0 text-secondary'>
                Browse the available titles in a clean, easy-to-read table
                layout.
              </p>
            </div>

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

          <div className='table-responsive'>
            <table className='table table-hover align-middle mb-0'>
              <thead className='table-light'>
                <tr>
                  <th className='px-4 py-3 text-uppercase small text-secondary'>
                    Title
                  </th>
                  <th className='py-3 text-uppercase small text-secondary'>
                    Author
                  </th>
                  <th className='py-3 text-uppercase small text-secondary'>
                    Publisher
                  </th>
                  <th className='py-3 text-uppercase small text-secondary'>
                    ISBN
                  </th>
                  <th className='py-3 text-uppercase small text-secondary'>
                    Classification
                  </th>
                  <th className='py-3 text-uppercase small text-secondary'>
                    Category
                  </th>
                  <th className='py-3 text-uppercase small text-secondary'>
                    Page Count
                  </th>
                  <th className='py-3 text-uppercase small text-secondary'>
                    Price
                  </th>
                  <th className='py-3 text-uppercase small text-secondary'>
                    Quantity
                  </th>
                  <th className='pe-4 py-3 text-uppercase small text-secondary'>
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {books.map((book) => (
                  <tr key={book.bookId}>
                    <td className='px-4 py-3 fw-semibold text-dark'>
                      {book.title}
                    </td>
                    <td className='py-3'>{book.author}</td>
                    <td className='py-3'>{book.publisher}</td>
                    <td className='py-3 text-nowrap'>{book.isbn}</td>
                    <td className='py-3'>{book.classification}</td>
                    <td className='py-3'>{book.category}</td>
                    <td className='py-3'>{book.pageCount}</td>
                    <td className='py-3 fw-semibold text-dark'>
                      ${book.price.toFixed(2)}
                    </td>

                    <td className='py-3'>
                      <div className='d-flex align-items-center gap-2'>
                        <button
                          type='button'
                          className='btn btn-sm btn-outline-secondary'
                          onClick={() => updateQuantity(book.bookId, -1)}
                        >
                          -
                        </button>

                        <span
                          className='fw-semibold quantity-display'
                        >
                          {quantities[book.bookId] ?? 0}
                        </span>

                        <button
                          type='button'
                          className='btn btn-sm btn-outline-secondary'
                          onClick={() => updateQuantity(book.bookId, 1)}
                        >
                          +
                        </button>
                      </div>
                    </td>

                    <td className='pe-4 py-3'>
                      <button
                        type='button'
                        className='btn btn-primary btn-sm'
                        disabled={(quantities[book.bookId] ?? 0) === 0}
                        onClick={() => handleAddToCart(book)}
                      >
                        Add to Cart
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
  );
}

export default BookList;
