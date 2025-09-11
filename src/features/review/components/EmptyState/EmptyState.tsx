import React from "react";
import { useNavigate } from "react-router-dom";
import "./EmptyState.css";

// User Icon
const UserIcon = () => (
  <svg
    width="64"
    height="64"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
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

interface EmptyStateProps {
  type?: "search" | "general";
  title?: string;
  subtitle?: string;
  description?: string;
  showAddButton?: boolean;
  onAddClick?: () => void;
  addButtonText?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  type = "search",
  title = "Không tìm thấy giảng viên",
  subtitle = "Thử điều chỉnh bộ lọc tìm kiếm hoặc thêm giảng viên.",
  description = "Không tìm thấy giảng viên bạn muốn?",
  showAddButton = true,
  onAddClick,
  addButtonText = "Thêm giảng viên tại đây",
}) => {
  const navigate = useNavigate();

  const handleAddClick = () => {
    console.log("👉 handleAddClick được gọi");
    if (onAddClick) {
      console.log("👉 Dùng onAddClick custom");
      onAddClick();
    } else {
      console.log("👉 Dùng navigate mặc định tới /add-teacher");
      navigate("/add-teacher");
    }
    console.log("👉 handleAddClick kết thúc");
  };

  return (
    <div className="empty-state">
      <div className="empty-state-content">
        <div className="empty-state-icon">
          <UserIcon />
        </div>

        <div className="empty-state-text">
          <h3 className="empty-state-title">{title}</h3>
          <p className="empty-state-subtitle">{subtitle}</p>

          {description && (
            <p className="empty-state-description">{description}</p>
          )}
        </div>

        {showAddButton && (
          <button
            type="button"
            className="empty-state-button"
            onClick={handleAddClick}
          >
            <PlusIcon />
            {addButtonText}
          </button>
        )}
      </div>

      {/* Decorative elements */}
      <div className="empty-state-decoration">
        <div className="decoration-circle decoration-circle-1"></div>
        <div className="decoration-circle decoration-circle-2"></div>
        <div className="decoration-circle decoration-circle-3"></div>
      </div>
    </div>
  );
};

export default EmptyState;
