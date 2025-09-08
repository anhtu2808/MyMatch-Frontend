import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AddTeacherForm.css";
import {
  getAllCampusesAPI,
  createLecturerAPI,
} from "../../apis/TeacherPageApis";

// Info Icon
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
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4" />
    <path d="M12 8h.01" />
  </svg>
);

interface Campus {
  id: number;
  name: string;
}

interface AddTeacherFormProps {
  onSubmit?: (data: any) => void;
  onBack?: () => void;
}

function AddTeacherForm({ onSubmit, onBack }: AddTeacherFormProps) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    lecturerCode: "",
    campusId: "",
    bio: "",
  });

  const [campuses, setCampuses] = useState<Campus[]>([]);
  const [loading, setLoading] = useState(false);
  const [isCampusDropdownOpen, setIsCampusDropdownOpen] = useState(false);

  // fetch campuses
  useEffect(() => {
    const fetchCampuses = async () => {
      setLoading(true);
      try {
        const res = await getAllCampusesAPI();
        const data = res.result?.data || [];
        setCampuses(data.map((c: any) => ({ id: c.id, name: c.name })));
      } catch (err) {
        console.error("Error fetching campuses:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCampuses();
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.fullName || !formData.lecturerCode || !formData.campusId) {
      alert("Vui lòng điền đầy đủ Họ tên, Mã giảng viên và chọn Campus!");
      return;
    }

    try {
      const payload = {
        name: formData.fullName,
        code: formData.lecturerCode,
        bio: formData.bio || "",
        campusId: Number(formData.campusId),
      };

      const res = await createLecturerAPI(payload);
      alert("Tạo giảng viên thành công!");
      console.log("Created lecturer:", res);

      // Sau khi tạo thì điều hướng
      navigate("/add-review");
    } catch (error) {
      console.error("Error creating lecturer:", error);
      alert("Có lỗi xảy ra khi tạo giảng viên!");
    }
  };

  const handleBack = () => {
    if (onBack) onBack();
    else navigate("/add-review");
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
            onChange={(e) => handleInputChange("fullName", e.target.value)}
          />
        </div>

        {/* Lecturer Code */}
        <div className="form-group">
          <label className="form-label">
            Mã giảng viên <span className="required">*</span>
          </label>
          <input
            type="text"
            className="form-input"
            placeholder="Nhập mã giảng viên (VD: LamNN2, HuyNM...)"
            value={formData.lecturerCode}
            onChange={(e) => handleInputChange("lecturerCode", e.target.value)}
          />
        </div>

        {/* Campus */}
        <div className="form-group">
          <label className="form-label">
            Campus <span className="required">*</span>
          </label>
          <div className="custom-dropdown">
            <div
              className="dropdown-trigger"
              onClick={() => setIsCampusDropdownOpen(!isCampusDropdownOpen)}
            >
              {formData.campusId
                ? campuses.find((c) => String(c.id) === formData.campusId)?.name
                : loading
                ? "Đang tải..."
                : "Chọn campus"}
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
                {campuses.map((c) => (
                  <div
                    key={c.id}
                    className={`dropdown-option ${
                      formData.campusId === String(c.id) ? "selected" : ""
                    }`}
                    onClick={() => {
                      handleInputChange("campusId", String(c.id));
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

        {/* Description */}
        <div className="form-group">
          <label className="form-label">Mô tả (không bắt buộc)</label>
          <textarea
            className="form-input"
            placeholder="Nhập mô tả về giảng viên"
            value={formData.bio}
            onChange={(e) => handleInputChange("bio", e.target.value)}
          />
        </div>

        {/* Info Section */}
        <div className="info-section">
          <InfoIcon />
          <div className="info-content">
            <h4>Lưu ý:</h4>
            <ul>
              <li>
                Tất cả thông tin sẽ được quản trị viên xem xét và xác minh
              </li>
              <li>Vui lòng cung cấp thông tin chính xác và đầy đủ</li>
              <li>Vui lòng kiểm tra lại thông tin trước khi submit</li>
            </ul>
          </div>
        </div>

        {/* Buttons */}
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
