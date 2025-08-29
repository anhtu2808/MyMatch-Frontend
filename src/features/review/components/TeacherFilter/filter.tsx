import React, { useState } from "react";
import "./filter.css";

// Search Icon Component
const SearchIcon = ({ className = "" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`search-icon ${className}`}
  >
    <path d="m21 21-4.34-4.34"/>
    <circle cx="11" cy="11" r="8"/>
  </svg>
);

// Clear/Eraser Icon Component
const ClearIcon = ({ className = "" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`clear-icon ${className}`}
  >
    <path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21"/>
    <path d="M22 21H7"/>
    <path d="m5 11 9 9"/>
  </svg>
);

const TeacherFilter: React.FC = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedSort, setSelectedSort] = useState("Đánh giá cao nhất");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const sortOptions = [
    "Đánh giá cao nhất",
    "Đánh giá thấp nhất",
    "Đánh giá nhiều nhất",
    "Tên A-Z"
  ];

  return (
    <div className="teacher-filter">
      {/* Tabs */}
      <div className="tabs">
        <div
          className={`tab ${activeTab === "all" ? "active" : ""}`}
          onClick={() => setActiveTab("all")}
        >
          Tất cả (5)
        </div>
        <div
          className={`tab ${activeTab === "rated" ? "active" : ""}`}
          onClick={() => setActiveTab("rated")}
        >
          Đã đánh giá (2)
        </div>
        <div
          className={`tab ${activeTab === "marked" ? "active" : ""}`}
          onClick={() => setActiveTab("marked")}
        >
          Đã đánh dấu (2)
        </div>
      </div>

      <hr className="divider" />

      {/* Filters */}
      <div className="filter-grid">
        <div className="form-group">
          <label>Tên giảng viên</label>
          <input type="text" placeholder="Type a name..." />
        </div>
        <div className="form-group">
          <label>Mã giảng viên</label>
          <input type="text" placeholder="e.g. TCH123" />
        </div>
        <div className="form-group">
          <label>Tên môn</label>
          <input type="text" placeholder="e.g. Algorithms" />
        </div>
        <div className="form-group">
          <label>Mã môn</label>
          <input type="text" placeholder="e.g. CS101" />
        </div>
      </div>

      {/* Sort + Actions */}
      <div className="actions">
        <div className="sort-section">
          <label className="sort-label">Sắp xếp theo</label>
          <div className="custom-dropdown">
            <div
              className="dropdown-trigger"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              {selectedSort}
              <svg
                className={`dropdown-arrow ${isDropdownOpen ? 'open' : ''}`}
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="6,9 12,15 18,9"></polyline>
              </svg>
            </div>
            {isDropdownOpen && (
              <div className="dropdown-menu">
                {sortOptions.map((option) => (
                  <div
                    key={option}
                    className={`dropdown-option ${selectedSort === option ? 'selected' : ''}`}
                    onClick={() => {
                      setSelectedSort(option);
                      setIsDropdownOpen(false);
                    }}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="buttons">
          <button className="btn-clear">
            <ClearIcon className="btn-icon" />
            Xóa bộ lọc
          </button>
          <button className="btn-search">
            <SearchIcon className="btn-icon" />
            Tìm kiếm
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherFilter;
