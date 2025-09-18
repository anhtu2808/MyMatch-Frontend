import React, { useState, useEffect } from "react";
import "./MaterialFilter.css";

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
    <path d="m21 21-4.34-4.34" />
    <circle cx="11" cy="11" r="8" />
  </svg>
);

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
    <path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21" />
    <path d="M22 21H7" />
    <path d="m5 11 9 9" />
  </svg>
);

interface MaterialFilterProps {
  onSearch: (filters: {
    name?: string;
    course?: string;
    lecturer?: string;
    ownerOnly?: boolean;
  }) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const MaterialFilter: React.FC<MaterialFilterProps> = ({
  onSearch,
  activeTab,
  setActiveTab,
}) => {
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [lecturer, setLecturer] = useState("");

  const handleSearch = () => {
    onSearch({ name, course, lecturer, ownerOnly: activeTab === "mine" });
  };

  const handleClear = () => {
    setName("");
    setCourse("");
    setLecturer("");
    setActiveTab("all");
    onSearch({});
  };

  return (
    <div className="material-filter">
      {/* Tabs */}
      <div className="material-tabs">
        <div
          className={`tab ${activeTab === "all" ? "active" : ""}`}
          onClick={() => setActiveTab("all")}
        >
          Tất cả tài liệu
        </div>
        <div
          className={`tab ${activeTab === "mine" ? "active" : ""}`}
          onClick={() => setActiveTab("mine")}
        >
          Tài liệu đã đăng tải
        </div>
      </div>

      <br className="material-divider" />

      {/* Filters */}
      <div className="material-filter-grid">
        <div className="material-form-group">
          <label>Tên tài liệu</label>
          <input
            type="text"
            value={name}
            placeholder="e.g. Assignment 1"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="material-form-group">
          <label>Mã môn học</label>
          <input
            type="text"
            value={course}
            placeholder="e.g. EXE201"
            onChange={(e) => setCourse(e.target.value)}
          />
        </div>
        <div className="material-form-group">
          <label>Tên giảng viên</label>
          <input
            type="text"
            value={lecturer}
            placeholder="e.g. Nguyen Van A"
            onChange={(e) => setLecturer(e.target.value)}
          />
        </div>
      </div>

      {/* Sort + Actions */}
      <div className="material-actions">
        <div className="material-buttons">
          <button className="btn-clear" onClick={handleClear}>
            <ClearIcon className="btn-icon" /> Xóa bộ lọc
          </button>
          <button className="btn-search" onClick={handleSearch}>
            <SearchIcon className="btn-icon" /> Tìm kiếm
          </button>
        </div>
      </div>
    </div>
  );
};

export default MaterialFilter;
