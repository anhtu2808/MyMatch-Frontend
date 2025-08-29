import React, { useState } from "react";
import "./ReviewList.css";

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
    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>
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
    <path d="M7 10v12"/>
    <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"/>
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
    <path d="M17 14V2"/>
    <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z"/>
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
    <circle cx="11" cy="11" r="8"/>
    <path d="m21 21-4.35-4.35"/>
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
    <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46"/>
  </svg>
);

interface Review {
  id: string;
  studentName: string;
  studentCode: string;
  avatar: string;
  rating: number;
  date: string;
  semester: string;
  isVerified: boolean;
  hasDiscount: boolean;
  discountPercent?: number;
  comment: string;
  teachingQuality: number;
  teachingMethod: number;
  difficulty: number;
  tags: string[];
  likes: number;
  dislikes: number;
}

const ReviewList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("Mới nhất");
  const [filterBy, setFilterBy] = useState("Tất cả");
  const [statusFilter, setStatusFilter] = useState("Tất cả");
  const [showAllReviews, setShowAllReviews] = useState(false);

  // Dropdown states
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);

  // Dropdown options
  const sortOptions = [
    "Mới nhất",
    "Cũ nhất",
    "Điểm cao nhất",
    "Điểm thấp nhất"
  ];

  const filterOptions = [
    "Tất cả",
    "SEC303",
    "Toán cao cấp"
  ];

  const statusOptions = [
    "Tất cả",
    "Đã xác thực",
    "Chưa xác thực"
  ];

  const reviews: Review[] = [
    {
      id: "1",
      studentName: "Sinh viên K17",
      studentCode: "SV",
      avatar: "https://i.pravatar.cc/150?img=2",
      rating: 2,
      date: "3/1/2024",
      semester: "SEC303",
      isVerified: true,
      hasDiscount: true,
      discountPercent: 23,
      comment: "Kiến thức ổn nhưng thái độ với sinh viên chưa thật sự tốt. Đôi khi hơi khó tính và không kiên nhẫn.",
      teachingQuality: 3.5,
      teachingMethod: 2.5,
      difficulty: 6.5,
      tags: ["Cần cải thiện", "Khó tính", "Thiếu kiên nhẫn"],
      likes: 15,
      dislikes: 12
    },
    {
      id: "2", 
      studentName: "Sinh viên K17",
      studentCode: "SV",
      avatar: "https://i.pravatar.cc/150?img=3",
      rating: 5,
      date: "20/1/2024",
      semester: "SEC303",
      isVerified: true,
      hasDiscount: true,
      discountPercent: 91,
      comment: "Phương pháp giảng dạy sáng tạo, luôn cập nhật kiến thức mới. Rất đáng để học tử thầy.",
      teachingQuality: 4.7,
      teachingMethod: 4.6,
      difficulty: 8.8,
      tags: ["Sáng tạo", "Cập nhật", "Đáng học hỏi"],
      likes: 28,
      dislikes: 3
    }
  ];

  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 1);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <StarIcon key={index} filled={index < rating} />
    ));
  };

  return (
    <div className="review-list">
      {/* Header */}
      <div className="review-header">
        <div className="review-title">
          <h2>Đánh giá từ sinh viên</h2>
          <p>308 đánh giá • Cập nhật gần nhất: hôm nay</p>
        </div>
        <div className="search-container">
          <SearchIcon />
          <input
            type="text"
            placeholder="Tìm kiếm đánh giá..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Filters */}
      <div className="review-filters">
        <div className="filter-group">
          <label>
            <FilterIcon />
            Môn học
          </label>
          <div className="custom-dropdown">
            <div
              className="dropdown-trigger"
              onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
            >
              {filterBy}
              <svg
                className={`dropdown-arrow ${isFilterDropdownOpen ? 'open' : ''}`}
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
            {isFilterDropdownOpen && (
              <div className="dropdown-menu">
                {filterOptions.map((option) => (
                  <div
                    key={option}
                    className={`dropdown-option ${filterBy === option ? 'selected' : ''}`}
                    onClick={() => {
                      setFilterBy(option);
                      setIsFilterDropdownOpen(false);
                    }}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="filter-group">
          <label>Sắp xếp theo</label>
          <div className="custom-dropdown">
            <div
              className="dropdown-trigger"
              onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
            >
              {sortBy}
              <svg
                className={`dropdown-arrow ${isSortDropdownOpen ? 'open' : ''}`}
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
            {isSortDropdownOpen && (
              <div className="dropdown-menu">
                {sortOptions.map((option) => (
                  <div
                    key={option}
                    className={`dropdown-option ${sortBy === option ? 'selected' : ''}`}
                    onClick={() => {
                      setSortBy(option);
                      setIsSortDropdownOpen(false);
                    }}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="filter-group">
          <label>Trạng thái</label>
          <div className="custom-dropdown">
            <div
              className="dropdown-trigger"
              onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
            >
              {statusFilter}
              <svg
                className={`dropdown-arrow ${isStatusDropdownOpen ? 'open' : ''}`}
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
                {statusOptions.map((option) => (
                  <div
                    key={option}
                    className={`dropdown-option ${statusFilter === option ? 'selected' : ''}`}
                    onClick={() => {
                      setStatusFilter(option);
                      setIsStatusDropdownOpen(false);
                    }}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="results-count">8 kết quả</div>
      </div>

      {/* Reviews */}
      <div className="reviews-container">
        {displayedReviews.map((review) => (
          <div key={review.id} className="review-card">
            <div className="review-main">
              <div className="reviewer-info">
                <div className="reviewer-avatar">
                  <span>{review.studentCode}</span>
                </div>
                <div className="reviewer-details">
                  <div className="reviewer-header">
                    <h4>{review.studentName}</h4>
                    <div className="review-meta">
                      <span className="semester">{review.semester}</span>
                      {review.hasDiscount && (
                        <span className="discount-badge">
                          AI cho biết có {review.discountPercent}% sinh viên có cùng đánh giá
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="review-date">{review.date}</div>
                  {review.isVerified && <span className="verified-badge">Đã xác thực</span>}
                </div>
              </div>

              <div className="review-rating">
                <div className="stars">{renderStars(review.rating)}</div>
              </div>
            </div>

            <div className="review-content">
              <p>{review.comment}</p>
            </div>

            <div className="review-metrics">
              <div className="metric">
                <span className="metric-label">Tiêu chí giảng dạy</span>
                <span className="metric-value">{review.teachingQuality}/5.0</span>
              </div>
              <div className="metric">
                <span className="metric-label">Chất lượng giảng dạy</span>
                <span className="metric-value">{review.teachingMethod}/5.0</span>
              </div>
              <div className="metric">
                <span className="metric-label">Điểm tổng</span>
                <span className="metric-value">{review.difficulty}/10</span>
              </div>
            </div>

            <div className="review-tags">
              {review.tags.map((tag, index) => (
                <span key={index} className="tag">{tag}</span>
              ))}
            </div>

            <div className="review-actions">
              <button className="action-btn like-btn">
                <ThumbsUpIcon />
                {review.likes}
              </button>
              <button className="action-btn dislike-btn">
                <ThumbsDownIcon />
                {review.dislikes}
              </button>
              <button className="more-btn">...</button>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
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
