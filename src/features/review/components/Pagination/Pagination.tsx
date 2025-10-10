import React, { useState } from "react";
import "./Pagination.css";

// Arrow Icons
const ChevronLeft = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="15,18 9,12 15,6"></polyline>
  </svg>
);

const ChevronRight = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="9,18 15,12 9,6"></polyline>
  </svg>
);

interface PaginationProps {
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage = 1,
  totalPages = 10,
  onPageChange = () => {},
}) => {
  const [activePage, setActivePage] = useState(currentPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setActivePage(page);
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];

    // Always show first page
    pages.push(
      <button
        key={1}
        className={`page-btn ${activePage === 1 ? "active" : ""}`}
        onClick={() => handlePageChange(1)}
      >
        1
      </button>
    );

    // Show dots before current range
    if (activePage > 3) {
      pages.push(
        <span key="dots-left" className="dots">
          ...
        </span>
      );
    }

    // Show middle range: activePage-1, activePage, activePage+1
    for (let page = activePage - 1; page <= activePage + 1; page++) {
      if (page > 1 && page < totalPages) {
        pages.push(
          <button
            key={page}
            className={`page-btn ${activePage === page ? "active" : ""}`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        );
      }
    }

    // Show dots after current range
    if (activePage < totalPages - 2) {
      pages.push(
        <span key="dots-right" className="dots">
          ...
        </span>
      );
    }

    // Always show last page
    if (totalPages > 1) {
      pages.push(
        <button
          key={totalPages}
          className={`page-btn ${activePage === totalPages ? "active" : ""}`}
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="pagination">
      {/* Previous button */}
      <button
        className="nav-btn"
        onClick={() => handlePageChange(activePage - 1)}
        disabled={activePage === 1}
      >
        <ChevronLeft />
      </button>

      {/* Page numbers */}
      <div className="page-numbers">{renderPageNumbers()}</div>

      {/* Next button */}
      <button
        className="nav-btn"
        onClick={() => handlePageChange(activePage + 1)}
        disabled={activePage === totalPages}
      >
        <ChevronRight />
      </button>
    </div>
  );
};

export default Pagination;
