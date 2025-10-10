import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TeacherSelector.css";
import { useEffect } from "react";
import {
  getAllLecturerAPI,
  getAllCampusesAPI,
} from "../../apis/TeacherPageApis";

// Search Icon
const SearchIcon = () => (
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
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

// Hash Icon
const HashIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="4" y1="9" x2="20" y2="9" />
    <line x1="4" y1="15" x2="20" y2="15" />
    <line x1="10" y1="3" x2="8" y2="21" />
    <line x1="16" y1="3" x2="14" y2="21" />
  </svg>
);

// Check Icon
const CheckIcon = () => (
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
    <polyline points="20,6 9,17 4,12" />
  </svg>
);

// Plus Icon
const PlusIcon = () => (
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
    <path d="M12 5v14" />
    <path d="M5 12h14" />
  </svg>
);

// Lightbulb Icon
const LightbulbIcon = () => (
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
    <path d="M9 21h6" />
    <path d="M12 3a6 6 0 0 1 6 6c0 3-2 5.5-2 8h-8c0-2.5-2-5-2-8a6 6 0 0 1 6-6Z" />
  </svg>
);

interface Teacher {
  id: string;
  name: string;
  code: string;
  avatar?: string;
}

interface Campus {
  id: number;
  name: string;
}

interface TeacherSelectorProps {
  selectedTeacher: Teacher | null;
  onTeacherSelect: (teacher: Teacher | null) => void;
  onBack?: () => void;
  onNext?: () => void;
  showButtons?: boolean;
}

const TeacherSelector: React.FC<TeacherSelectorProps> = ({
  selectedTeacher,
  onTeacherSelect,
  onBack,
  onNext,
  showButtons = true,
}) => {
  const navigate = useNavigate();

  const [searchName, setSearchName] = useState("");
  const [searchCode, setSearchCode] = useState("");
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [campuses, setCampuses] = useState<Campus[]>([]);
  const [selectedCampus, setSelectedCampus] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [showDropdownName, setShowDropdownName] = useState(false);
  const [showDropdownCode, setShowDropdownCode] = useState(false);

  // Load campuses khi component mount
  useEffect(() => {
    const fetchCampuses = async () => {
      try {
        const response = await getAllCampusesAPI();
        // lấy đúng mảng data
        const data = response.result?.data || [];
        setCampuses(data.map((c: any) => ({ id: c.id, name: c.name })));
      } catch (error) {
        console.error("Error fetching campuses:", error);
      }
    };
    fetchCampuses();
  }, []);

  // Fetch teachers mỗi khi campus/name/code thay đổi
  useEffect(() => {
    const fetchTeachers = async () => {
      if (!selectedCampus) return; // chỉ fetch khi có campus
      setLoading(true);
      try {
        const res = await getAllLecturerAPI({
          campusId: selectedCampus,
          name: searchName || undefined,
          code: searchCode || undefined,
          page: 1,
          size: 20,
        });
        setTeachers(res.result?.data || []);
      } catch (err) {
        console.error("Error fetching teachers:", err);
      } finally {
        setLoading(false);
      }
    };

    // debounce nhỏ cho search
    const timeout = setTimeout(fetchTeachers, 300);
    return () => clearTimeout(timeout);
  }, [selectedCampus, searchName, searchCode]);

  const handleTeacherSelect = (teacher: Teacher) => {
    onTeacherSelect(teacher);
    setSearchName(teacher.name);
    setSearchCode(teacher.code);
  };

  const handleBack = () => {
    if (onBack) onBack();
  };

  return (
    <div className="teacher-selector">
      {/* Campus Selector */}
      <div className="search-group">
        <label className="search-label">Chọn cơ sở *</label>
        <select
          className="search-input"
          value={selectedCampus ?? ""}
          onChange={(e) => {
            setSelectedCampus(Number(e.target.value));
            onTeacherSelect(null); // reset teacher khi đổi campus
          }}
        >
          <option value="">-- Chọn cơ sở --</option>
          {campuses.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>
      <br />

      {/* Search Inputs */}
      <div className="search-section">
        <div className="search-group">
          <label className="search-label">
            <SearchIcon />
            Tên giảng viên
          </label>
          <input
            type="text"
            className="search-input"
            placeholder="Nhập tên giảng viên..."
            value={searchName}
            onChange={(e) => {
              setSearchName(e.target.value);
              onTeacherSelect(null);
            }}
            onFocus={() => {
              setShowDropdownName(true);
              setShowDropdownCode(false); // đóng dropdown kia
            }}
            onBlur={() => setTimeout(() => setShowDropdownName(false), 200)}
          />

          {showDropdownName && !loading && teachers.length > 0 && (
            <div className="dropdown-menu">
              {teachers.map((teacher) => (
                <div
                  key={teacher.id}
                  className="dropdown-option"
                  onMouseDown={() => handleTeacherSelect(teacher)}
                >
                  {teacher.name} - {teacher.code}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="search-group">
          <label className="search-label">
            <HashIcon />
            Mã giảng viên
          </label>
          <input
            type="text"
            className="search-input"
            placeholder="Nhập mã giảng viên..."
            value={searchCode}
            onChange={(e) => {
              setSearchCode(e.target.value);
              onTeacherSelect(null);
            }}
            onFocus={() => {
              setShowDropdownCode(true);
              setShowDropdownName(false); // đóng dropdown kia
            }}
            onBlur={() => setTimeout(() => setShowDropdownCode(false), 200)}
          />
          {loading && <p>Đang tải...</p>}
          {showDropdownCode && !loading && teachers.length > 0 && (
            <div className="dropdown-menu">
              {teachers.map((teacher) => (
                <div
                  key={teacher.id}
                  className="dropdown-option"
                  onMouseDown={() => handleTeacherSelect(teacher)}
                >
                  {teacher.name} - {teacher.code}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Results */}

      {/* Selected Teacher */}
      {selectedTeacher && (
        <div className="selected-teacher-section">
          <div className="teacher-item selected">
            <div className="teacher-avatar">
              {selectedTeacher.name.charAt(0)}
            </div>
            <div className="teacher-info">
              <h4 className="teacher-name">{selectedTeacher.name}</h4>
              <p className="teacher-subtitle">Giảng viên đã chọn</p>
            </div>
            <div className="check-icon">
              <CheckIcon />
            </div>
          </div>
        </div>
      )}

      {/* No Results */}
      {!loading && teachers.length === 0 && (
        <div className="no-results">
          <p>Không tìm thấy giảng viên?</p>
        </div>
      )}

      {/* Help Section */}
      <div className="help-section">
        <div className="help-icon">
          <LightbulbIcon />
        </div>
        <div className="help-content">
          <h4>Giúp chúng tôi mở rộng cơ sở dữ liệu!</h4>
          <p>
            Không tìm thấy giảng viên bạn muốn review? Hãy giúp cộng đồng sinh
            viên bằng cách thêm thông tin giảng viên mới.
          </p>
          <button
            className="add-teacher-btn"
            onClick={() => navigate("/add-teacher")}
          >
            <PlusIcon />
            Thêm giảng viên
          </button>
        </div>
      </div>

      {/* Navigation Buttons */}
      {showButtons && (
        <div className="navigation-buttons">
          <button className="btn-back" onClick={handleBack} disabled={!onBack}>
            Quay lại
          </button>
          <button
            className="btn-next"
            onClick={onNext}
            disabled={!selectedTeacher || !onNext}
          >
            Tiếp theo
          </button>
        </div>
      )}
    </div>
  );
};

export default TeacherSelector;
