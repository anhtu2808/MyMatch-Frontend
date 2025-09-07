import React from "react";
import { useNavigate } from "react-router-dom";
import "./LecturerInformation.css";

// Back Arrow Icon
const BackArrowIcon = () => (
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
    <path d="m15 18-6-6 6-6"/>
  </svg>
);

// Star Icon
const StarIcon = ({ filled = true }: { filled?: boolean }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill={filled ? "#FFC107" : "none"}
    stroke="#FFC107"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>
  </svg>
);

// Heart Icon for Save
const HeartIcon = () => (
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
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);

// Crown Icon for PRO
const CrownIcon = () => (
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
    <path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z"/>
    <path d="M5 21h14"/>
  </svg>
);

interface LecturerData {
  name: string;
  username: string;
  university: string;
  experience: string;
  subjects?: string[];
  rating: number;
  totalReviews: number;
  avatar: string;
  isOnline: boolean;
}

const LecturerInformation: React.FC = () => {
  const navigate = useNavigate();

  const lecturerData: LecturerData = {
    name: "Lê Văn Cường",
    username: "CuongLV22",
    university: "FPT University",
    experience: "8 năm kinh nghiệm",
    subjects: ["Toán cao cấp", "Xác suất thống kê"],
    rating: 4.2,
    totalReviews: 308,
    avatar: "https://i.pravatar.cc/150?img=1",
    isOnline: true
  };

  const handleBackClick = () => {
    window.history.back();
  };

  const handleReviewClick = () => {
    navigate(`/add-review/${lecturerData.username}`, {
      state: {
        teacherId: lecturerData.username,
        teacherName: lecturerData.name,
        teacherCode: lecturerData.username
      }
    });
  };

  return (
    <div className="lecturer-information">
      {/* Header Section */}
      <div className="lecturer-header">
        <button className="back-button" onClick={handleBackClick}>
          <BackArrowIcon />
          <span>Quay lại</span>
          <span className="breadcrumb">/ Chi tiết giảng viên</span>
        </button>

        <div className="lecturer-main-info">
          <div className="lecturer-avatar-section">
            <div className="avatar-container">
              <img src={lecturerData.avatar} alt={lecturerData.name} className="lecturer-avatar" />
              {lecturerData.isOnline && <div className="online-indicator"></div>}
            </div>

            <div className="lecturer-details">
              <h1 className="lecturer-name">{lecturerData.name}</h1>
              <p className="lecturer-username">{lecturerData.username}</p>
              <p className="lecturer-info">{lecturerData.university} • {lecturerData.experience}</p>
              <p className="lecturer-info">{lecturerData.subjects ? lecturerData.subjects.join(", ") : "Chưa cập nhật môn học"}
                </p>
              <div className="rating-section">
                <div className="stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon key={star} filled={star <= Math.round(lecturerData.rating)} />
                  ))}
                </div>
                <div>
                <span className="rating-text">{lecturerData.rating}/5.0 </span>
                <span className="review-count">({lecturerData.totalReviews} lượt review)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="action-buttons">
            <button className="save-button">
              <HeartIcon />
              Lưu lại
            </button>
            <button className="rate-button" onClick={handleReviewClick}>
              Review
            </button>
            <button className="tutor-button">
              <CrownIcon />
              Gợi ý học tập
              <span className="pro-badge">PRO</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LecturerInformation;