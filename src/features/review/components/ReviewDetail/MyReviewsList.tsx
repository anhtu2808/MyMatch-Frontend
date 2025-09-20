import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyReviewsAPI, deleteReviewAPI } from "../../../home/apis";
import "./MyReviewsList.css";

interface ReviewData {
  id: number;
  courseName: string;
  semesterName: string;
  overallScore: number;
  isAnonymous: boolean;
  isVerified: boolean;
}

interface MyReviewsListProps {
  page: number;
  size: number;
  onTotalPages: (total: number) => void;
}

const MyReviewsList: React.FC<MyReviewsListProps> = ({
  page,
  size,
  onTotalPages,
}) => {
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const res = await getMyReviewsAPI(page, size);
        setReviews(res.data);
        onTotalPages(res.totalPages);
      } catch (err) {
        console.error("Error fetching my reviews:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [page, size, onTotalPages]);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Bạn có chắc muốn xóa review này không?")) return;
    try {
      await deleteReviewAPI(id);
      setReviews((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      console.error("Lỗi khi xóa review:", err);
    }
  };

  if (loading) return <p>Đang tải review...</p>;

  if (reviews.length === 0) return <p>Bạn chưa có review nào.</p>;

  return (
    <div className="my-review-list">
      {reviews.map((r) => (
        <div
          key={r.id}
          className="my-review-card"
          onClick={() => navigate(`/review/${r.id}`)}
        >
          <div className="my-review-info">
            <div className="my-review-header">
              <div className="my-review-course-semester">
                <h3 className="my-review-course">
                  {r.courseName || "Không rõ môn"}
                </h3>
                <span className="my-review-semester">{r.semesterName}</span>
              </div>
              <span className="my-review-name">
                {r.isAnonymous ? "Ẩn danh" : "Công khai"}
              </span>
              <span className="my-review-status unverified">
                {r.isVerified ? (
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
              </span>
            </div>

            <div className="my-review-rating">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill={i < Math.round(r.overallScore) ? "#FFC107" : "none"}
                  stroke="#FFC107"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-star"
                >
                  <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                </svg>
              ))}
              <span className="my-review-score">
                {r.overallScore.toFixed(1)}
              </span>
            </div>
          </div>

          {/* Button delete */}
          <button
            className="delete-review-btn"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(r.id);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-x-icon lucide-x"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
};

export default MyReviewsList;
