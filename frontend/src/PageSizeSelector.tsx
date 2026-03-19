type PageSizeSelectorProps = {
  pageSize: number;
  onPageSizeChange: (size: number) => void;
};

function PageSizeSelector({
  pageSize,
  onPageSizeChange,
}: PageSizeSelectorProps) {
  return (
    <div className="d-flex align-items-center gap-2">
      <label
        htmlFor="page-size"
        className="form-label mb-0 fw-semibold text-secondary text-nowrap"
      >
        Results per page:
      </label>
      <select
        id="page-size"
        className="form-select form-select-sm w-auto"
        value={pageSize}
        onChange={(e) => onPageSizeChange(Number(e.target.value))}
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
      </select>
    </div>
  );
}

export default PageSizeSelector;
