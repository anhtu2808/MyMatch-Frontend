import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddTeacherForm.css';

// Info Icon Component
const InfoIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="info-icon"
  >
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 16v-4"/>
    <path d="M12 8h.01"/>
  </svg>
);

interface AddTeacherFormProps {
  onSubmit?: (data: any) => void;
  onBack?: () => void;
}

function AddTeacherForm({ onSubmit, onBack }: AddTeacherFormProps) {
  const navigate = useNavigate();
  
  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    department: '',
    university: '',
    email: '',
    subjects: ''
  });

  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedUniversity, setSelectedUniversity] = useState('');
  const [isDepartmentDropdownOpen, setIsDepartmentDropdownOpen] = useState(false);
  const [isUniversityDropdownOpen, setIsUniversityDropdownOpen] = useState(false);
  const [isSubjectsDropdownOpen, setIsSubjectsDropdownOpen] = useState(false);

  // Options for dropdowns
  const departmentOptions = [
    { value: 'cntt', label: 'Công nghệ thông tin' },
    { value: 'ktpm', label: 'Kỹ thuật phần mềm' },
    { value: 'httt', label: 'Hệ thống thông tin' },
    { value: 'attt', label: 'An toàn thông tin' },
    { value: 'tmdt', label: 'Thương mại điện tử' }
  ];

  const universityOptions = [
    { value: 'fpt', label: 'Đại học FPT' },
    { value: 'bku', label: 'Đại học Bách khoa' },
    { value: 'hust', label: 'Đại học Bách khoa Hà Nội' },
    { value: 'uit', label: 'Đại học Công nghệ thông tin' }
  ];

  const subjectOptions = [
    'SEC303 - Bảo mật ứng dụng web',
    'PRN231 - Building Cross-Platform Apps',
    'SWE201 - Introduction to Software Engineering',
    'PRF192 - Programming Fundamentals',
    'MAD101 - Mobile Application Development'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    // Validate form
    if (!formData.fullName || !selectedDepartment || !selectedUniversity || !formData.subjects) {
      alert('Vui lòng điền đầy đủ thông tin bắt buộc');
      return;
    }

    const submitData = {
      ...formData,
      department: selectedDepartment,
      university: selectedUniversity
    };

    if (onSubmit) {
      onSubmit(submitData);
    } else {
      // Default behavior
      alert('Thông tin giảng viên đã được lưu thành công!');
      navigate('/add-review');
    }
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate('/add-review');
    }
  };

  return (
    <div className="add-teacher-form">
      <div className="form-header">
        <h2>Thông tin giảng viên</h2>
      </div>

      <div className="form-body">
        {/* Full Name */}
        <div className="form-group">
          <label className="form-label">
            Họ và tên <span className="required">*</span>
          </label>
          <input
            type="text"
            className="form-input"
            placeholder="Nhập họ và tên"
            value={formData.fullName}
            onChange={(e) => handleInputChange('fullName', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            Mã giảng viên
          </label>
          <input
            type="text"
            className="form-input"
            placeholder="Nhập mã giảng viên (VD: LamNN2, HuyNM...)"
            value={formData.fullName}
            onChange={(e) => handleInputChange('lecturerCode', e.target.value)}
          />
        </div>

        {/* Department and University Row */}
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">
              Bộ môn <span className="required">*</span>
            </label>
            <div className="custom-dropdown">
              <div
                className="dropdown-trigger"
                onClick={() => setIsDepartmentDropdownOpen(!isDepartmentDropdownOpen)}
              >
                {selectedDepartment ? departmentOptions.find(opt => opt.value === selectedDepartment)?.label : "Chọn khoa/bộ môn"}
                <svg
                  className={`dropdown-arrow ${isDepartmentDropdownOpen ? 'open' : ''}`}
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
              {isDepartmentDropdownOpen && (
                <div className="dropdown-menu">
                  {departmentOptions.map((option) => (
                    <div
                      key={option.value}
                      className={`dropdown-option ${selectedDepartment === option.value ? 'selected' : ''}`}
                      onClick={() => {
                        setSelectedDepartment(option.value);
                        setIsDepartmentDropdownOpen(false);
                      }}
                    >
                      {option.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              Trường đại học <span className="required">*</span>
            </label>
            <div className="custom-dropdown">
              <div
                className="dropdown-trigger"
                onClick={() => setIsUniversityDropdownOpen(!isUniversityDropdownOpen)}
              >
                {selectedUniversity ? universityOptions.find(opt => opt.value === selectedUniversity)?.label : "Chọn trường đại học"}
                <svg
                  className={`dropdown-arrow ${isUniversityDropdownOpen ? 'open' : ''}`}
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
              {isUniversityDropdownOpen && (
                <div className="dropdown-menu">
                  {universityOptions.map((option) => (
                    <div
                      key={option.value}
                      className={`dropdown-option ${selectedUniversity === option.value ? 'selected' : ''}`}
                      onClick={() => {
                        setSelectedUniversity(option.value);
                        setIsUniversityDropdownOpen(false);
                      }}
                    >
                      {option.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Email */}
        <div className="form-group">
          <label className="form-label">Email (không bắt buộc)</label>
          <input
            type="email"
            className="form-input"
            placeholder="Nhập địa chỉ email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
          />
        </div>

        {/* Subjects */}
        <div className="form-group subjects-section">
          <h3 className="section-title">Môn học giảng dạy</h3>
          <p className="form-description">
            Chọn các môn học mà giảng viên này giảng dạy <span className="required">*</span>
          </p>
          <div className="custom-dropdown">
            <div
              className="dropdown-trigger"
              onClick={() => setIsSubjectsDropdownOpen(!isSubjectsDropdownOpen)}
            >
              {formData.subjects || "Chọn môn học..."}
              <svg
                className={`dropdown-arrow ${isSubjectsDropdownOpen ? 'open' : ''}`}
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
            {isSubjectsDropdownOpen && (
              <div className="dropdown-menu">
                {subjectOptions.map((subject) => (
                  <div
                    key={subject}
                    className={`dropdown-option ${formData.subjects === subject ? 'selected' : ''}`}
                    onClick={() => {
                      handleInputChange('subjects', subject);
                      setIsSubjectsDropdownOpen(false);
                    }}
                  >
                    {subject}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Info Section */}
        <div className="info-section">
          <InfoIcon />
          <div className="info-content">
            <h4>Lưu ý:</h4>
            <ul>
              <li>Tất cả thông tin sẽ được quản trị viên xem xét và xác minh</li>
              <li>Vui lòng cung cấp thông tin chính xác và đầy đủ</li>
              <li>Giảng viên sẽ được thông báo sau khi được phê duyệt</li>
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="form-actions">
          <button className="btn-back" onClick={handleBack}>
            Quay lại
          </button>
          <button className="btn-submit" onClick={handleSubmit}>
            Lưu thông tin
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddTeacherForm;
