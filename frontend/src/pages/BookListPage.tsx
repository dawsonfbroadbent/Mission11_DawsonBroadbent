import { useRef, useState } from 'react';
import { Offcanvas } from 'bootstrap';
import BookList from '../components/BookList';
import Heading from '../components/Heading';
import BookFilter from '../components/BookCategoryFilter';
import CartSummary from '../components/CartSummary';
import '../styles/BookListPage.css';

// Main page layout: cart summary, heading, category filter sidebar, and book list.
// Uses Bootstrap Grid and Offcanvas for responsive filter panel on mobile.
function BookListPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const offcanvasRef = useRef<HTMLDivElement>(null);

  const handleCloseFilters = () => {
    if (!offcanvasRef.current) return;

    Offcanvas.getOrCreateInstance(offcanvasRef.current).hide();
  };

  return (
    <div className='book-list-page'>
      <CartSummary />
      <Heading />
      <div className='container py-4'>
        <div className='row g-4'>
          <div className='col-lg-2'>
            <button
              className='btn btn-outline-primary d-lg-none mb-3'
              type='button'
              data-bs-toggle='offcanvas'
              data-bs-target='#categoryFilters'
              aria-controls='categoryFilters'
            >
              Filters
            </button>

            <div
              className='offcanvas-lg offcanvas-start filter-offcanvas'
              tabIndex={-1}
              id='categoryFilters'
              aria-labelledby='categoryFiltersLabel'
              ref={offcanvasRef}
            >
              <div className='offcanvas-header border-bottom d-lg-none'>
                <h5 className='offcanvas-title fw-semibold' id='categoryFiltersLabel'>
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
                  <BookFilter
                    selectedCategories={selectedCategories}
                    setSelectedCategories={setSelectedCategories}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className='col-lg-10'>
            <BookList selectedCategories={selectedCategories} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookListPage;
