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
  onPageChange = () => {}
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
    
    // Always show page 1
    pages.push(
      <button
        key={1}
        className={`page-btn ${activePage === 1 ? 'active' : ''}`}
        onClick={() => handlePageChange(1)}
      >
        1
      </button>
    );

    // Show page 2 if not the same as page 1
    if (totalPages > 1) {
      pages.push(
        <button
          key={2}
          className={`page-btn ${activePage === 2 ? 'active' : ''}`}
          onClick={() => handlePageChange(2)}
        >
          2
        </button>
      );
    }

    // Show page 3 if exists
    if (totalPages > 2) {
      pages.push(
        <button
          key={3}
          className={`page-btn ${activePage === 3 ? 'active' : ''}`}
          onClick={() => handlePageChange(3)}
        >
          3
        </button>
      );
    }

    // Show dots if there are more pages
    if (totalPages > 4) {
      pages.push(
        <span key="dots" className="dots">
          ...
        </span>
      );
    }

    // Show last page if it's different from the ones already shown
    if (totalPages > 3) {
      pages.push(
        <button
          key={totalPages}
          className={`page-btn ${activePage === totalPages ? 'active' : ''}`}
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
      <div className="page-numbers">
        {renderPageNumbers()}
      </div>

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
