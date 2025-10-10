import { useNavigate } from "react-router-dom";
import EmptyState from "../EmptyState/EmptyState";
import "./TeacherPageComponents.css";
import React, { useState } from "react";
import TeacherFilter from "../TeacherFilter/filter";

// Star Icon Component
const StarIcon = ({
  filled = false,
  className = "",
}: {
  filled?: boolean;
  className?: string;
}) => (
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
    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
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
    <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
    <circle cx="12" cy="12" r="3" />
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
    <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
  </svg>
);

type LecturerDTO = {
  id: number;
  name: string;
  code: string;
  bio?: string;
  campus?: {
    id: number;
    name: string;
    university?: {
      id: number;
      name: string;
      imgUrl?: string;
      courses?: { id: number; code: string; name: string }[];
    };
  };
  tags?: { id: number; name: string }[];
  reviewCount?: number;
  avatarUrl?: string;
  rating?: number;
  subjectCount?: number;
};

export interface TeacherCardData {
  id: number;
  name: string;
  username: string;
  avatar: string;
  courses: string[];
  rating: number;
  reviews: number;
  subjects: number;
}

export const mapLecturerToCard = (dto: LecturerDTO): TeacherCardData => ({
  id: dto.id,
  name: dto.name,
  username: dto.code, // API không có username -> dùng code
  avatar:
    dto.avatarUrl ??
    "https://ptehelper.com.au/wp-content/uploads/2022/12/logo-dai-hoc-fpt.png",
  courses: dto.campus?.university?.courses?.map((c) => c.name) ?? [],
  rating: dto.rating ?? 0, // API chưa trả rating -> 0
  reviews: dto.reviewCount ?? 0,
  subjects: dto.subjectCount ?? 0,
});

function TeacherCard({
  teacher,
  isBookmarked,
  onToggleBookmark,
}: {
  teacher: TeacherCardData;
  isBookmarked: boolean;
  onToggleBookmark: (id: number) => void;
}) {
  const navigate = useNavigate();

  const handleViewClick = () => {
    navigate(`/lecturer-detail/${teacher.id}`);
  };

  const handleReviewClick = () => {
    if (!token) {navigate("/login")}
    navigate(`/add-review/${teacher.id}`, {
      state: {
        teacherId: teacher.id,
        teacherName: teacher.name,
        teacherCode: teacher.username,
      },
    });
  };

  const token = localStorage.getItem("accessToken");
  return (
    <div className="teacher-card">
      {/* Top section with gray background */}
      <div className="teacher-card-top">
        <div className="teacher-card-header">
          <div className="teacher-avatar-container">
            <img
              src="https://ptehelper.com.au/wp-content/uploads/2022/12/logo-dai-hoc-fpt.png"
              alt={teacher.name}
              className="teacher-avatar"
            />
            {/* <div className="online-indicator"></div> */}
          </div>
          {/* <div className="teacher-rating-badge">
            <StarIcon filled={true} className="badge-star" />
            {teacher.rating.toFixed(1)}
          </div> */}
        </div>

        <div className="teacher-info">
          <h3 className="teacher-namee">{teacher.name}</h3>
          <p className="teacher-usernamee">{teacher.username}</p>
          {/* <p className="teacher-courses">{teacher.courses.join(", ")}</p> */}
        </div>
      </div>

      <div className="teacher-card-bottom">
        {/* <div className="teacher-rating-section">
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
        </div> */}

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
 
        <div className="teacher-card-footer">
          <button className="btn-rate" onClick={handleReviewClick}>
            <StarIcon filled={false} className="btn-star" />
            Review
          </button>
          <button className="btn-view" onClick={handleViewClick}>
            <EyeIcon className="btn-eye" />
             Xem review
          </button>
          {/* <button
            className={`btn-bookmark ${isBookmarked ? "active" : ""}`}
            onClick={() => onToggleBookmark(teacher.id)}
          >
            <BookmarkIcon className="btn-bookmark-icon" />
          </button> */}
        </div> 
      </div>
    </div>
  );
}

interface TeacherPageComponentsProps {
  teachers: TeacherCardData[];
  searchQuery?: string;
  filters?: any;
  showEmptyState?: boolean;
  activeTab: string;
  bookmarkedTeachers: number[];
  onToggleBookmark: (id: number) => void;
}

export default function TeacherPageComponents({
  teachers,
  searchQuery = "",
  filters = {},
  showEmptyState = false,
  activeTab,
  bookmarkedTeachers,
  onToggleBookmark,
}: TeacherPageComponentsProps) {
  // lọc theo searchQuery + filters
  const navigate = useNavigate();
  let filteredTeachers = teachers.filter((teacher) => {
    if (searchQuery) {
      return (
        teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        teacher.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        teacher.courses.some((course) =>
          course.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
    return true;
  });

  if (activeTab === "marked") {
    filteredTeachers = filteredTeachers.filter((t) =>
      bookmarkedTeachers.includes(t.id)
    );
  }

  if (showEmptyState) {
    return (
      <EmptyState
        title="Không tìm thấy giảng viên"
        subtitle="Thử điều chỉnh bộ lọc tìm kiếm hoặc thêm giảng viên."
        description="Không tìm thấy giảng viên bạn muốn?"
        showAddButton={true}
        addButtonText="Thêm giảng viên tại đây"
        onAddClick={() => {
          console.log("Navigate to add teacher page");
          navigate("/add-teacher");
        }}
      />
    );
  }

  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" ,
    justifyContent: "center"}}>
        {filteredTeachers.map((teacher) => (
          <TeacherCard
            key={teacher.id}
            teacher={teacher}
            isBookmarked={bookmarkedTeachers.includes(teacher.id)}
            onToggleBookmark={onToggleBookmark}
          />
        ))}
      </div>
    </div>
  );
}
