import React, { useState, useEffect } from "react";
import "./MaterialFilter.css";
import { getProfileAPI } from "../../../profile/apis";
import { useNavigate } from "react-router-dom";

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

const CreateIcon = ({ className = "" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-file-plus2-icon lucide-file-plus-2"
  >
    <path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4" />
    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    <path d="M3 15h6" />
    <path d="M6 12v6" />
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
    isPurchased?: boolean; 
    sortBy?: string; 
    sortDir?: string;
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
  const [sort, setSort] = useState("");
  const [selectedLabel, setSelectedLabel] = useState("Mặc định");
  const [isOpen, setIsOpen] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getProfileAPI();
        setUserId(res.userId);
      } catch (error) {
        console.error("Lỗi khi lấy user info:", error);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const timerId = setTimeout(() => {
      const [sortBy, sortDir] = sort.split("_");
     let purchasedParam: boolean | undefined = undefined;
      if (activeTab === "purchased") {
        purchasedParam = true;
      } else if (activeTab === "all") {
        purchasedParam = undefined; 
      }

     onSearch({ 
          name, 
          course, 
          lecturer, 
          ownerOnly: activeTab === "mine", 
          isPurchased: purchasedParam,
          sortBy, 
          sortDir,
      });
   }, 500);
   return () => {
    clearTimeout(timerId);
     };
   }, [name, course, lecturer, activeTab,sort, onSearch]);

  const selectSort = (value: string, label: string) => {
    setSort(value);
    setSelectedLabel(label);
    setIsOpen(false);
  };

  const handleClear = () => {
    setName("");
    setCourse("");
    setLecturer("");
    setActiveTab("all");
  };
  
  const handleSearch = () => {
    const [sortBy, sortDir] = sort.split("_");
    onSearch({ name, course, lecturer, ownerOnly: activeTab === "mine" , isPurchased: activeTab === "purchased", sortBy, sortDir,});
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
        <div
          className={`tab ${activeTab === "purchased" ? "active" : ""}`}
          onClick={() => setActiveTab("purchased")}
          >
          Tài liệu đã mua
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
      <div className="material-actionss">
      <div className="material-sort-group">
          <label>Sắp xếp theo</label>
          <div
            className={`material-sort-select ${isOpen ? "open" : ""}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            <span>{selectedLabel}</span>
            <span className={`sort-arrow ${isOpen ? "open" : ""}`}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-down-icon lucide-chevron-down"><path d="m6 9 6 6 6-6"/></svg></span>
          </div>
          {isOpen && (
            <ul className="material-sort-options">
              <li
                className={`material-sort-option ${sort === "" ? "selected" : ""}`}
                onClick={() => selectSort("", "Mặc định")}
              >
                Mặc định
              </li>
              <li
                className={`material-sort-option ${sort === "createAt_DESC" ? "selected" : ""}`}
                onClick={() => selectSort("createAt_DESC", "Mới nhất")}
              >
                Mới nhất
              </li>
              <li
                className={`material-sort-option ${sort === "createAt_ASC" ? "selected" : ""}`}
                onClick={() => selectSort("createAt_ASC", "Cũ nhất")}
              >
                Cũ nhất
              </li>
              <li
                className={`material-sort-option ${sort === "purchaseCount_DESC" ? "selected" : ""}`}
                onClick={() => selectSort("purchaseCount_DESC", "Lượt mua giảm dần")}
              >
                Lượt mua giảm dần
              </li>
              <li
                className={`material-sort-option ${sort === "purchaseCount_ASC" ? "selected" : ""}`}
                onClick={() => selectSort("purchaseCount_ASC", "Lượt mua tăng dần")}
              >
                Lượt mua tăng dần
              </li>

            </ul>
          )}
        </div>

        {/* <div className="material-buttons">
          <button className="btn-clear" onClick={handleClear}>
            <ClearIcon className="btn-icon" /> Xóa bộ lọc
          </button>
          <button className="btn-search" onClick={handleSearch}>
            <SearchIcon className="btn-icon" /> Tìm kiếm
          </button>
        </div> */}
        <div className="material-actions-create">
          <button
            className="btn-create"
            onClick={() => navigate("/material/create")}
          >
            <CreateIcon className="btn-icon" /> Tải lên tài liệu
          </button>
        </div>
      </div>
    </div>
  );
};

export default MaterialFilter;
