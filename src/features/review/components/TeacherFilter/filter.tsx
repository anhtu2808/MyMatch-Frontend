import React, { useState, useEffect } from "react";
import { getAllCampusesAPI } from "../../apis/TeacherPageApis";
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

interface Campus {
  id: number;
  name: string;
}

interface TeacherFilterProps {
  onSearch: (filters: {
    name?: string;
    code?: string;
    campusId?: number;
    sort?: string;
  }) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TeacherFilter: React.FC<TeacherFilterProps> = ({
  onSearch,
  activeTab,
  setActiveTab,
}: TeacherFilterProps) => {
  // const [activeTab, setActiveTab] = useState("all");
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [campusId, setCampusId] = useState<number | "">("");
  const [campuses, setCampuses] = useState<Campus[]>([]);
  const [isCampusDropdownOpen, setIsCampusDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchCampuses = async () => {
      try {
        const res = await getAllCampusesAPI({ page: 1, size: 50, sort: "id" });
        if (res?.result?.data) {
          setCampuses(res.result.data);
        }
      } catch (err) {
        console.error("Error fetching campuses:", err);
      }
    };
    fetchCampuses();
  }, []);

  const handleSearch = () => {
    const filters: {
      name?: string;
      code?: string;
      campusId?: number;
      sort?: string;
      isReviewed?: boolean;
      isMarked?: boolean;
      myReviews?: boolean;
    } = {
      name,
      code,
      campusId: campusId === "" ? undefined : Number(campusId),
    };

    if (activeTab === "rated") {
      filters.isReviewed = true;
    } else if (activeTab === "marked") {
      filters.isMarked = true;
    } else if (activeTab === "myreviews") {
      filters.myReviews = true;
    }

    onSearch(filters);
  };

  const handleClear = () => {
    setName("");
    setCode("");
    setCampusId("");
    onSearch({});
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch();
      }}
      className="teacher-filter"
    >
      {/* Tabs */}
      <div className="tabs">
        <div
          className={`tab ${activeTab === "all" ? "active" : ""}`}
          onClick={() => setActiveTab("all")}
        >
          Tất cả
        </div>
        <div
          className={`tab ${activeTab === "rated" ? "active" : ""}`}
          onClick={() => setActiveTab("rated")}
        >
          Đã review
        </div>
        {/* <div
          className={`tab ${activeTab === "marked" ? "active" : ""}`}
          onClick={() => setActiveTab("marked")}
        >
          Đã đánh dấu
        </div> */}
        <div
          className={`tab ${activeTab === "myreviews" ? "active" : ""}`}
          onClick={() => setActiveTab("myreviews")}
        >
          Review của tôi
        </div>
      </div>

      <hr className="divider" />

      {/* Filters */}
      <div className="filterr-grid">
        <div className="form-group">
          <label>Tên giảng viên</label>
          <input
            type="text"
            value={name}
            placeholder="e.g. Nguyen Van A"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Mã giảng viên</label>
          <input
            type="text"
            value={code}
            placeholder="e.g. ANV123"
            onChange={(e) => setCode(e.target.value)}
          />
        </div>
        <div className="sort-section">
          <label className="sort-label">Campus</label>
          <div className="custom-dropdown">
            <div
              className="dropdown-trigger"
              onClick={() => setIsCampusDropdownOpen(!isCampusDropdownOpen)}
            >
              {campusId
                ? campuses.find((c) => c.id === campusId)?.name
                : "-- Tất cả --"}
              <svg
                className={`dropdown-arrow ${
                  isCampusDropdownOpen ? "open" : ""
                }`}
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

            {isCampusDropdownOpen && (
              <div className="dropdown-menu">
                <div
                  className={`dropdown-option ${
                    campusId === "" ? "selected" : ""
                  }`}
                  onClick={() => {
                    setCampusId("");
                    setIsCampusDropdownOpen(false);
                  }}
                >
                  -- Tất cả --
                </div>
                {campuses.map((c) => (
                  <div
                    key={c.id}
                    className={`dropdown-option ${
                      campusId === c.id ? "selected" : ""
                    }`}
                    onClick={() => {
                      setCampusId(c.id);
                      setIsCampusDropdownOpen(false);
                    }}
                  >
                    {c.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sort + Actions */}
      <div className="actions">
        <div className="buttons">
          <button type="button" className="btn-clear" onClick={handleClear}>
            <ClearIcon className="btn-icon" /> Xóa bộ lọc
          </button>
          <button type="submit" className="btn-search">
            <SearchIcon className="btn-icon" /> Tìm kiếm
          </button>
        </div>
      </div>
    </form>
  );
};

export default TeacherFilter;
