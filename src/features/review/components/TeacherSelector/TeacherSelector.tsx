import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TeacherSelector.css';

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
    <circle cx="11" cy="11" r="8"/>
    <path d="m21 21-4.35-4.35"/>
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
    <line x1="4" y1="9" x2="20" y2="9"/>
    <line x1="4" y1="15" x2="20" y2="15"/>
    <line x1="10" y1="3" x2="8" y2="21"/>
    <line x1="16" y1="3" x2="14" y2="21"/>
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
    <polyline points="20,6 9,17 4,12"/>
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
    <path d="M12 5v14"/>
    <path d="M5 12h14"/>
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
    <path d="M9 21h6"/>
    <path d="M12 3a6 6 0 0 1 6 6c0 3-2 5.5-2 8h-8c0-2.5-2-5-2-8a6 6 0 0 1 6-6Z"/>
  </svg>
);

interface Teacher {
  id: string;
  name: string;
  code: string;
  avatar?: string;
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
  showButtons = true
}) => {
  const navigate = useNavigate();
  const [searchName, setSearchName] = useState('');
  const [searchCode, setSearchCode] = useState('');
  const [showNameDropdown, setShowNameDropdown] = useState(false);
  const [showCodeDropdown, setShowCodeDropdown] = useState(false);

  // Mock data - replace with API call
  const teachers: Teacher[] = [
    {
      id: '1',
      name: 'Lê Văn Cường',
      code: 'CuongLV22'
    },
    {
      id: '2',
      name: 'Nguyễn Văn An',
      code: 'AnNV23'
    },
    {
      id: '3',
      name: 'Trần Thị Bình',
      code: 'BinhTT24'
    },
    {
      id: '4',
      name: 'Phạm Thị Dung',
      code: 'DungPT23'
    },
    {
      id: '5',
      name: 'Hoàng Văn Em',
      code: 'EmHV24'
    }
  ];

  // Filter teachers based on search
  const filteredTeachersByName = teachers.filter(teacher =>
    teacher.name.toLowerCase().includes(searchName.toLowerCase()) && searchName.length > 0
  );

  const filteredTeachersByCode = teachers.filter(teacher =>
    teacher.code.toLowerCase().includes(searchCode.toLowerCase()) && searchCode.length > 0
  );

  const handleTeacherSelect = (teacher: Teacher) => {
    onTeacherSelect(teacher);
    setSearchName(teacher.name);
    setSearchCode(teacher.code);
    setShowNameDropdown(false);
    setShowCodeDropdown(false);
    // Don't auto advance to next step - wait for user to click "Tiếp theo"
  };



  const handleNameInputChange = (value: string) => {
    setSearchName(value);
    setShowCodeDropdown(false);

    // If user starts typing and there was a selected teacher, clear it
    if (selectedTeacher && value !== selectedTeacher.name) {
      onTeacherSelect(null);
    }

    // Show dropdown real-time when typing
    setShowNameDropdown(value.length > 0);
  };

  const handleCodeInputChange = (value: string) => {
    setSearchCode(value);
    setShowNameDropdown(false);

    // If user starts typing and there was a selected teacher, clear it
    if (selectedTeacher && value !== selectedTeacher.code) {
      onTeacherSelect(null);
    }

    // Show dropdown real-time when typing
    setShowCodeDropdown(value.length > 0);
  };

  const handleNameInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && searchName.length > 0) {
      setShowNameDropdown(filteredTeachersByName.length > 0);
      setShowCodeDropdown(false);
    }
  };

  const handleCodeInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && searchCode.length > 0) {
      setShowCodeDropdown(filteredTeachersByCode.length > 0);
      setShowNameDropdown(false);
    }
  };

  const handleNameInputBlur = () => {
    // Show dropdown when user finishes typing (loses focus)
    if (searchName.length > 0) {
      setTimeout(() => {
        setShowNameDropdown(filteredTeachersByName.length > 0);
      }, 100); // Small delay to allow click on dropdown items
    }
  };

  const handleCodeInputBlur = () => {
    // Show dropdown when user finishes typing (loses focus)
    if (searchCode.length > 0) {
      setTimeout(() => {
        setShowCodeDropdown(filteredTeachersByCode.length > 0);
      }, 100); // Small delay to allow click on dropdown items
    }
  };

  const handleBack = () => {
    // Navigate back to teachers page
    if (onBack) {
      onBack();
    }
  };

  return (
    <div className="teacher-selector">
      {/* Search Inputs */}
      <div className="search-section">
        <div className="search-group">
          <label className="search-label">
            <SearchIcon />
            Tên giảng viên *
          </label>
          <div className="search-dropdown-container">
            <input
              type="text"
              className="search-input"
              placeholder="Nhập tên giảng viên để tìm kiếm..."
              value={selectedTeacher ? selectedTeacher.name : searchName}
              onChange={(e) => handleNameInputChange(e.target.value)}
              onKeyDown={handleNameInputKeyDown}
              onBlur={handleNameInputBlur}
            />
            {showNameDropdown && filteredTeachersByName.length > 0 && (
              <div className="dropdown-menu">
                {filteredTeachersByName.map((teacher) => (
                  <div
                    key={teacher.id}
                    className="dropdown-option"
                    onClick={() => handleTeacherSelect(teacher)}
                  >
                    {teacher.name} - {teacher.code}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="search-group">
          <label className="search-label">
            <HashIcon />
            Hoặc tìm kiếm bằng mã giảng viên
          </label>
          <div className="search-dropdown-container">
            <input
              type="text"
              className="search-input"
              placeholder="Nhập mã giảng viên (VD: LamNN2, HuyNM...)"
              value={selectedTeacher ? selectedTeacher.code : searchCode}
              onChange={(e) => handleCodeInputChange(e.target.value)}
              onKeyDown={handleCodeInputKeyDown}
              onBlur={handleCodeInputBlur}
            />
            {showCodeDropdown && filteredTeachersByCode.length > 0 && (
              <div className="dropdown-menu">
                {filteredTeachersByCode.map((teacher) => (
                  <div
                    key={teacher.id}
                    className="dropdown-option"
                    onClick={() => handleTeacherSelect(teacher)}
                  >
                    {teacher.name} - {teacher.code}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Selected Teacher Display */}
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

      {/* No Results Text */}
      {!selectedTeacher && (
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
          <p>Không tìm thấy giảng viên bạn muốn review? Hãy giúp cộng đồng sinh viên bằng cách thêm thông tin giảng viên mới.</p>
          <button
            className="add-teacher-btn"
            onClick={() => navigate('/add-teacher')}
          >
            <PlusIcon />
            Thêm giảng viên
          </button>
        </div>
      </div>

      {/* Navigation Buttons */}
      {showButtons && (
        <div className="navigation-buttons">
          <button
            className="btn-back"
            onClick={handleBack}
            disabled={!onBack}
          >
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
