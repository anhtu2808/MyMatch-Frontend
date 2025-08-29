
import { useNavigate } from "react-router-dom";
import EmptyState from "../EmptyState/EmptyState";
import "./TeacherPageComponents.css";

// Star Icon Component
const StarIcon = ({ filled = false, className = "" }: { filled?: boolean; className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`star-icon ${className}`}
  >
    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>
  </svg>
);

// Eye Icon Component
const EyeIcon = ({ className = "" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`eye-icon ${className}`}
  >
    <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

// Bookmark Icon Component
const BookmarkIcon = ({ className = "" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`bookmark-icon ${className}`}
  >
    <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>
  </svg>
);

interface Teacher {
  name: string;
  username: string;
  avatar: string;
  courses: string[];
  rating: number;
  reviews: number;
  subjects: number;
}

const teachers: Teacher[] = [
  {
    name: "Lê Văn Cường",
    username: "CuongLV22",
    avatar: "https://i.pravatar.cc/150?img=1",
    courses: ["SEC302", "SEC303", "SEC304"],
    rating: 4.9,
    reviews: 89,
    subjects: 3,
  },
  {
    name: "Nguyễn Văn An",
    username: "AnNV23",
    avatar: "https://i.pravatar.cc/150?img=2",
    courses: ["SWE201", "PRN201", "PRU321"],
    rating: 4.7,
    reviews: 3,
    subjects: 3,
  },
];

function TeacherCard({ teacher }: { teacher: Teacher }) {
  const navigate = useNavigate();

  const handleViewClick = () => {
    navigate('/lecturer-detail');
  };

  const handleReviewClick = () => {
    navigate(`/add-review/${teacher.username}`, {
      state: {
        teacherId: teacher.username,
        teacherName: teacher.name,
        teacherCode: teacher.username
      }
    });
  };

  return (
    <div className="teacher-card">
      {/* Top section with gray background */}
      <div className="teacher-card-top">
        {/* Header with avatar and rating badge */}
        <div className="teacher-card-header">
          <div className="teacher-avatar-container">
            <img src={teacher.avatar} alt={teacher.name} className="teacher-avatar" />
            <div className="online-indicator"></div>
          </div>
          <div className="teacher-rating-badge">
            <StarIcon filled={true} className="badge-star" />
            {teacher.rating.toFixed(1)}
          </div>
        </div>

        {/* Teacher info */}
        <div className="teacher-info">
          <h3 className="teacher-name">{teacher.name}</h3>
          <p className="teacher-username">{teacher.username}</p>
          <p className="teacher-courses">{teacher.courses.join(", ")}</p>
        </div>
      </div>

      {/* Bottom section with white background */}
      <div className="teacher-card-bottom">
        {/* Rating section */}
        <div className="teacher-rating-section">
          <div className="rating-stars">
            <div className="stars-container">
              {[1, 2, 3, 4, 5].map((star) => (
                <StarIcon
                  key={star}
                  filled={star <= Math.round(teacher.rating)}
                  className="rating-star"
                />
              ))}
            </div>
            <span className="rating-text">{teacher.rating.toFixed(1)}/5.0</span>
            <span className="review-count">{teacher.reviews} review</span>
          </div>
        </div>

        {/* Progress bars */}
        <div className="progress-section">
          <div className="progress-row">
            <span className="progress-label">Chất lượng</span>
            <div className="progress-bar-container">
              <div className="progress-bar green" style={{ width: `${(teacher.rating / 5) * 100}%` }}></div>
            </div>
            <span className="progress-value">{teacher.rating.toFixed(1)}</span>
          </div>

          <div className="progress-row">
            <span className="progress-label">Phổ biến</span>
            <div className="progress-bar-container">
              <div className="progress-bar gray" style={{ width: `${Math.min((teacher.reviews / 100) * 100, 100)}%` }}></div>
            </div>
            <span className="progress-value">{teacher.reviews}</span>
          </div>
        </div>

        {/* Stats */}
        <div className="teacher-stats">
          <div className="stat">
            <span className="stat-number">{teacher.reviews}</span>
            <p className="stat-label">Lượt Review</p>
          </div>
          <div className="stat">
            <span className="stat-number">{teacher.subjects}</span>
            <p className="stat-label">Môn học</p>
          </div>
        </div>

        {/* Footer buttons */}
        <div className="teacher-card-footer">
          <button className="btn-rate" onClick={handleReviewClick}>
            <StarIcon filled={false} className="btn-star" />
            Review
          </button>
          <button className="btn-view" onClick={handleViewClick}>
            <EyeIcon className="btn-eye" />
          </button>
          <button className="btn-bookmark">
            <BookmarkIcon className="btn-bookmark-icon" />
          </button>
        </div>
      </div>
    </div>
  );
}

interface TeacherPageComponentsProps {
  searchQuery?: string;
  filters?: any;
  showEmptyState?: boolean;
}

export default function TeacherPageComponents({
  searchQuery = "",
  filters = {},
  showEmptyState = false
}: TeacherPageComponentsProps = {}) {
  // Filter teachers based on search query and filters
  const filteredTeachers = teachers.filter(teacher => {
    if (searchQuery) {
      return teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
             teacher.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
             teacher.courses.some(course => course.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    return true;
  });

  // Show empty state if no teachers found or explicitly requested
  if (showEmptyState || (searchQuery && filteredTeachers.length === 0)) {
    return (
      <EmptyState
        title="Không tìm thấy giảng viên"
        subtitle="Thử điều chỉnh bộ lọc tìm kiếm."
        description="Không tìm thấy review về giảng viên bạn muốn?"
        showAddButton={true}
        addButtonText="Thêm giảng viên tại đây"
        onAddClick={() => {
          // Handle add teacher action
          console.log("Navigate to add teacher page");
        }}
      />
    );
  }

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
      {filteredTeachers.map((teacher, index) => (
        <TeacherCard key={index} teacher={teacher} />
      ))}
    </div>
  );
}
