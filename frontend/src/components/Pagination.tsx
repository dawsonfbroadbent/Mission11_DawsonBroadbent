type PaginationProps = {
  pageNum: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

// Renders page navigation buttons (Previous, numbered pages, Next)
function Pagination({ pageNum, totalPages, onPageChange }: PaginationProps) {
  return (
    <nav aria-label="Book list pagination">
      <ul className="pagination pagination-sm mb-0 justify-content-center justify-content-lg-end flex-wrap">
        <li className={`page-item ${pageNum === 1 ? 'disabled' : ''}`}>
          <button
            className="page-link px-3"
            disabled={pageNum === 1}
            onClick={() => onPageChange(pageNum - 1)}
          >
            Previous
          </button>
        </li>

        {[...Array(totalPages)].map((_, i) => (
          <li
            key={i + 1}
            className={`page-item ${pageNum === i + 1 ? 'active' : ''}`}
          >
            <button
              className="page-link"
              onClick={() => onPageChange(i + 1)}
              disabled={pageNum === i + 1}
            >
              {i + 1}
            </button>
          </li>
        ))}

        <li className={`page-item ${pageNum === totalPages ? 'disabled' : ''}`}>
          <button
            className="page-link px-3"
            disabled={pageNum === totalPages}
            onClick={() => onPageChange(pageNum + 1)}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
