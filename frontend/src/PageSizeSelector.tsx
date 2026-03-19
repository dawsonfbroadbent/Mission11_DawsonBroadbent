type PageSizeSelectorProps = {
  pageSize: number;
  onPageSizeChange: (size: number) => void;
};

function PageSizeSelector({
  pageSize,
  onPageSizeChange,
}: PageSizeSelectorProps) {
  return (
    <label>
      Results per page:
      <select
        value={pageSize}
        onChange={(e) => onPageSizeChange(Number(e.target.value))}
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
      </select>
    </label>
  );
}

export default PageSizeSelector;