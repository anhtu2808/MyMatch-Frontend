import React, { useState, useEffect } from "react";
import "./ReviewList.css";
import { getReviewsAPI } from "../../apis/TeacherPageApis";
import { useNavigate } from "react-router-dom";

// Star Icon
const StarIcon = ({ filled = true }: { filled?: boolean }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill={filled ? "#FFC107" : "none"}
    stroke="#FFC107"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
  </svg>
);

// Thumbs Up Icon
const ThumbsUpIcon = () => (
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
    <path d="M7 10v12" />
    <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
  </svg>
);

// Thumbs Down Icon
const ThumbsDownIcon = () => (
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
    <path d="M17 14V2" />
    <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z" />
  </svg>
);

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

// Filter Icon
const FilterIcon = () => (
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
    <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46" />
  </svg>
);

interface ReviewDetail {
  id: number;
  criteria: {
    id: number;
    name: string;
    type: string;
    description: string;
  };
  score: number;
  comment: string;
  isYes: boolean;
}

interface Review {
  id: number;
  overallScore: number;
  isVerified: boolean;
  isAnonymous: boolean;
  evidenceUrl?: string;
  student: {
    id: number;
    studentCode: string;
    user: {
      id: number;
      username: string;
      email: string;
      firstName: string;
      lastName: string;
      phone: string;
      avatarUrl?: string;
    };
    campus?: {
      id: number;
      name: string;
    };
  };
  course: {
    id: number;
    code: string;
    name: string;
  };
  semester?: {
    id: number;
    name: string;
  };
  details: ReviewDetail[];
  likes?: number;
  dislikes?: number;
}

const ExpandableText: React.FC<{ text: string; maxLength: number }> = ({
  text,
  maxLength,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (text.length <= maxLength) {
    return <p>{text}</p>;
  }

  return (
    <div>
      <p style={{ margin: 0 }}>
        {isExpanded ? text : `${text.substring(0, maxLength)}...`}
      </p>
      <button className="expand-button" onClick={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? "Thu gọn" : "Xem thêm"}
      </button>
    </div>
  );
};

const ReviewList: React.FC<{ lecturerId: number }> = ({ lecturerId }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [courseId, setCourseId] = useState<number>(0);
  const [semesterId, setSemesterId] = useState<number>(0);
  const [isVerified, setIsVerified] = useState<boolean | undefined>(true);
  const [isAnonymous, setIsAnonymous] = useState<boolean | undefined>(
    undefined
  );
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [isCourseDropdownOpen, setIsCourseDropdownOpen] = useState(false);
  const [isSemesterDropdownOpen, setIsSemesterDropdownOpen] = useState(false);
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [isAnonymousDropdownOpen, setIsAnonymousDropdownOpen] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const navigate = useNavigate();

  const courseOptions = Array.from(
    new Map(
      reviews
        .filter((r) => r.course.id && r.course.name)
        .map((r) => [r.course.id, { id: r.course.id!, name: r.course.name! }])
    ).values()
  );
  courseOptions.unshift({ id: 0, name: "Tất cả môn học" });

  const semesterOptions = Array.from(
    new Map(
      reviews
        .filter((r) => r.semester)
        .map((r) => [r.semester!.id, r.semester!])
    ).values()
  );
  semesterOptions.unshift({ id: 0, name: "Tất cả học kỳ" });

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await getReviewsAPI({
          lecturerId,
          courseId: courseId || undefined,
          semesterId: semesterId || undefined,
          isAnonymous,
          page: 1,
          size: 10,
          sortBy: "createAt",
          sortDirection: "DESC",
        });
        const enriched = (res.result.data || []).map((r: any) => ({
          ...r,
          likes: 0,
          dislikes: 0,
        }));
        setReviews(enriched);
      } catch (err) {
        console.error("Error fetching reviews:", err);
      }
    };
    fetchReviews();
  }, [lecturerId, courseId, semesterId, isAnonymous]);

  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 1);

  const renderStars = (rating: number) =>
    Array.from({ length: 5 }, (_, index) => (
      <StarIcon key={index} filled={index < rating} />
    ));

  const handleLike = (id: number) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, likes: (r.likes ?? 0) + 1 } : r))
    );
  };

  const handleDislike = (id: number) => {
    setReviews((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, dislikes: (r.dislikes ?? 0) + 1 } : r
      )
    );
  };

  
  

  return (
    <div className="review-list">
      <div className="review-header">
        <div className="review-title">
          <h2>Review từ sinh viên</h2>
          <p>{reviews.length} đánh giá</p>
        </div>
        {/* <div className="search-container">
          <SearchIcon />
          <input
            type="text"
            placeholder="Tìm kiếm review..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div> */}
      </div>

      {/* Filters */}
      <div className="review-filters">
        {/* Môn học */}
        <div className="filter-group">
          <label>
            <FilterIcon /> Môn học
          </label>
          <div className="custom-dropdown">
            <div
              className="dropdown-trigger"
              onClick={() => setIsCourseDropdownOpen(!isCourseDropdownOpen)}
            >
              {courseId === 0
                ? "Tất cả môn học"
                : courseOptions.find((c) => c.id === courseId)?.name}
              <svg
                className={`dropdown-arrow ${
                  isCourseDropdownOpen ? "open" : ""
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
            {isCourseDropdownOpen && (
              <div className="dropdown-menu">
                {courseOptions.map((option) => (
                  <div
                    key={option.id}
                    className={`dropdown-option ${
                      courseId === option.id ? "selected" : ""
                    }`}
                    onClick={() => {
                      setCourseId(option.id);
                      setIsCourseDropdownOpen(false);
                    }}
                  >
                    {option.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Học kỳ */}
        <div className="filter-group">
          <label>Học kỳ</label>
          <div className="custom-dropdown">
            <div
              className="dropdown-trigger"
              onClick={() => setIsSemesterDropdownOpen(!isSemesterDropdownOpen)}
            >
              {semesterId === 0
                ? "Tất cả học kỳ"
                : semesterOptions.find((s) => s.id === semesterId)?.name}
              <svg
                className={`dropdown-arrow ${
                  isSemesterDropdownOpen ? "open" : ""
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
            {isSemesterDropdownOpen && (
              <div className="dropdown-menu">
                {semesterOptions.map((option) => (
                  <div
                    key={option.id}
                    className={`dropdown-option ${
                      semesterId === option.id ? "selected" : ""
                    }`}
                    onClick={() => {
                      setSemesterId(option.id);
                      setIsSemesterDropdownOpen(false);
                    }}
                  >
                    {option.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Trạng thái xác thực */}
        {/* <div className="filter-group">
          <label>Trạng thái</label>
          <div className="custom-dropdown">
            <div
              className="dropdown-trigger"
              onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
            >
              {isVerified === undefined
                ? "Tất cả"
                : isVerified
                ? "Đã xác thực"
                : "Chưa xác thực"}
              <svg
                className={`dropdown-arrow ${
                  isStatusDropdownOpen ? "open" : ""
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
            {isStatusDropdownOpen && (
              <div className="dropdown-menu">
                <div
                  className={`dropdown-option ${
                    isVerified === undefined ? "selected" : ""
                  }`}
                  onClick={() => {
                    setIsVerified(undefined);
                    setIsStatusDropdownOpen(false);
                  }}
                >
                  Tất cả
                </div>
                <div
                  className={`dropdown-option ${
                    isVerified === true ? "selected" : ""
                  }`}
                  onClick={() => {
                    setIsVerified(true);
                    setIsStatusDropdownOpen(false);
                  }}
                >
                  Đã xác thực
                </div>
                <div
                  className={`dropdown-option ${
                    isVerified === false ? "selected" : ""
                  }`}
                  onClick={() => {
                    setIsVerified(false);
                    setIsStatusDropdownOpen(false);
                  }}
                >
                  Chưa xác thực
                </div>
              </div>
            )}
          </div>
        </div> */}

        {/* Ẩn danh */}
        <div className="filter-group">
          <label>Ẩn danh</label>
          <div className="custom-dropdown">
            <div
              className="dropdown-trigger"
              onClick={() =>
                setIsAnonymousDropdownOpen(!isAnonymousDropdownOpen)
              }
            >
              {isAnonymous === undefined
                ? "Tất cả"
                : isAnonymous
                ? "Ẩn danh"
                : "Hiển thị tên"}
              <svg
                className={`dropdown-arrow ${
                  isAnonymousDropdownOpen ? "open" : ""
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
            {isAnonymousDropdownOpen && (
              <div className="dropdown-menu">
                <div
                  className={`dropdown-option ${
                    isAnonymous === undefined ? "selected" : ""
                  }`}
                  onClick={() => {
                    setIsAnonymous(undefined);
                    setIsAnonymousDropdownOpen(false);
                  }}
                >
                  Tất cả
                </div>
                <div
                  className={`dropdown-option ${
                    isAnonymous === true ? "selected" : ""
                  }`}
                  onClick={() => {
                    setIsAnonymous(true);
                    setIsAnonymousDropdownOpen(false);
                  }}
                >
                  Ẩn danh
                </div>
                <div
                  className={`dropdown-option ${
                    isAnonymous === false ? "selected" : ""
                  }`}
                  onClick={() => {
                    setIsAnonymous(false);
                    setIsAnonymousDropdownOpen(false);
                  }}
                >
                  Hiển thị tên
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="results-count">{reviews.length} kết quả</div>
      </div>

      <div className="reviews-container">
        {displayedReviews.map((review) => {
          const scoreDetails = review.details.filter(
            (d) => d.criteria.type === "mark" && d.score !== null
          );
          const commentDetails = review.details.filter(
            (d) => d.criteria.type === "comment" && d.comment
          );

          return (
            <div
              key={review.id}
              className="review-card"
              onClick={() => navigate(`/review/${review.id}`)}
            >
            <div className="review-main">
              <div className="reviewer-info">
                <div className="reviewer-avatar">
                  {review.isAnonymous ? (
                      <img
                        src="https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
                        alt="Anonymous Avatar"
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: "50%",
                        }}
                      />
                    ) : review.student?.user?.avatarUrl ? (
                    <img
                      src={review.student.user.avatarUrl}
                      alt="Avatar"
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "50%",
                      }}
                    />
                  ) : (
                    "SV"
                  )}
                </div>

                <div className="reviewer-details">
                  <div className="reviewer-header">
                    <h4>
                      {review.isAnonymous
                        ? "Ẩn danh"
                        : review.student?.user?.username ||
                          "Tên chưa được cập nhật"}
                    </h4>
                    <div className="review-meta">
                      <span className="semester">{review.semester?.name}</span>
                    </div>
                  </div>
                  {/* ✅ / ❌ icon */}
                  <div className="verifiedd-status">
                    {review.isVerified ? (
                      <span className="verifiedd-icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="green"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M18 6 7 17l-5-5" />
                          <path d="m22 10-7.5 7.5L13 16" />
                        </svg>
                        Đã xác minh
                      </span>
                    ) : (
                      <span className="not-verifiedd-icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="red"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M18 6 6 18" />
                          <path d="m6 6 12 12" />
                        </svg>
                        Chưa xác minh
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="review-rating">
                <div className="stars">{renderStars(review.overallScore)}</div>
              </div>
            </div>

            <div className="review-content">
                {commentDetails.map((d) => (
                  <ExpandableText
                    key={d.id}
                    text={d.comment}
                    maxLength={200}
                  />
                ))}
              </div>

              {scoreDetails.length > 0 && (
                <div className="review-details-grid">
                  {scoreDetails.map((detail) => (
                    <div key={detail.id} className="score-item">
                      <span className="score-name">{detail.criteria.name}</span>
                      <span className="score-value">{detail.score}/5</span> 
                    </div>
                  ))}
                </div>
              )}

            {/* <div className="review-tags">
              {review.tags?.map((tag) => (
                <span key={tag.id} className="tag">
                  {tag.name}
                </span>
              ))}
            </div> */}

            {/* <div className="review-actions">
              <button
                className="action-btn like-btn"
                onClick={() => handleLike(review.id)}
              >
                <ThumbsUpIcon />
                {review.likes}
              </button>
              <button
                className="action-btn dislike-btn"
                onClick={() => handleDislike(review.id)}
              >
                <ThumbsDownIcon />
                {review.dislikes}
              </button>
            </div> */}
          </div>
           );
      })}
      </div>

      {!showAllReviews && reviews.length > 1 && (
        <div className="load-more-container">
          <button
            className="load-more-btn"
            onClick={() => setShowAllReviews(true)}
          >
            Xem thêm review
          </button>
        </div>
      )}
    </div>
  );
};

export default ReviewList;
