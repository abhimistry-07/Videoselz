import styles from "./Pagination.module.css";

interface Props {
  page: number;
  limit: number;
  total: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  page,
  limit,
  total,
  onPageChange,
}: Props) {
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const canGoPrev = page > 1;
  const canGoNext = page < totalPages;

  return (
    <nav className={styles.pagination} aria-label="Pagination">
      <span>
        Page {page} of {totalPages} ({total} videos)
      </span>
      <div className={styles.controls}>
        <button
          className={styles.button}
          onClick={() => onPageChange(page - 1)}
          disabled={!canGoPrev}
        >
          Previous
        </button>
        <button
          className={styles.button}
          onClick={() => onPageChange(page + 1)}
          disabled={!canGoNext}
        >
          Next
        </button>
      </div>
    </nav>
  );
}
