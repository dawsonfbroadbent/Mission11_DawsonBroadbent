type PaginationProps = {
  pageNum: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

function Pagination({ pageNum, totalPages, onPageChange }: PaginationProps) {
  return (
    <div>
      <button disabled={pageNum === 1} onClick={() => onPageChange(pageNum - 1)}>
        Previous
      </button>

      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i + 1}
          onClick={() => onPageChange(i + 1)}
          disabled={pageNum === i + 1}
        >
          {i + 1}
        </button>
      ))}

      <button
        disabled={pageNum === totalPages}
        onClick={() => onPageChange(pageNum + 1)}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;