import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Input, Switch } from "antd";
import Sidebar from "../../../components/sidebar/Sidebar";
import Header from "../../../components/header/Header";
import { getLecturerReviewByIdAPI } from "../apis/TeacherPageApis";
import "../components/ReviewCreteria/ReviewCreteria.css";
// import "./TeachersPage.css";
import "./ReviewDetail.css";
import { getStudentIdFromToken } from "../../home/apis";

const ReviewDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const reviewId = id ? Number(id) : undefined;
  const navigate = useNavigate();
  const [review, setReview] = useState<any>(null);
  const currentUserId = getStudentIdFromToken();

  useEffect(() => {
    if (!reviewId) return;

    getLecturerReviewByIdAPI(reviewId)
      .then((res) => {
        setReview(res.result);
        console.log("Review vừa load:", res.result);
        console.log("Current userId from token:", currentUserId);
        console.log("Review studentId:", res.result.student?.user?.id);
        console.log("Review evidenceUrl:", res.result.evidenceUrl);
      })
      .catch((err) => console.error("Lỗi load review:", err));
  }, [reviewId, currentUserId]);

  if (!reviewId) return <p>ID review không hợp lệ</p>;
  if (!review) return <p>Đang tải dữ liệu...</p>;

  return (
    <div className="teachers-page-container">
      <Sidebar />
      <Header title="Chi tiết Review" script="Xem chi tiết review giảng viên" />

      <div className="review-detail-page">
        {/* --- Step 2 info (course/semester/class) --- */}
        <div className="criteria-itemm">
          <h2>Thông tin môn học</h2>
          <p>
            <strong>Học kỳ:</strong> {review.semester?.name || "Không rõ"}
          </p>
          <p>
            <strong>Môn học:</strong> {review.course?.code} -{" "}
            {review.course?.name}
          </p>
          {/* <p>
            <strong>Mã lớp:</strong> {review.student?.studentCode}
          </p> */}
        </div>

        {/* --- Step 3 review details --- */}
        <div className="criteria-item-box">
          <h2>Review chi tiết</h2>
          {review.details.map((d: any) => (
            <div key={d.id} className="criteria-item">
              <div className="criteria-header">
                <div className="criteria-title">
                  <h4>{d.criteria.name}</h4>
                  {d.criteria.description && (
                    <p className="criteria-description">
                      {d.criteria.description}
                    </p>
                  )}
                </div>
                {d.criteria.type === "mark" && (
                  <span className="score-text">{d.score}/5</span>
                )}
              </div>

              {d.criteria.type === "mark" && (
                <div className="mark-options">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      className={`mark-btn ${d.score >= n ? "selected" : ""}`}
                      disabled
                    >
                      {n}
                    </button>
                  ))}
                </div>
              )}

              {d.criteria.type === "yes_no" && (
                <div className="yesno-options">
                  <button
                    className={`yes-btn ${d.isYes ? "selected" : ""}`}
                    disabled
                  >
                    Yes
                  </button>
                  <button
                    className={`no-btn ${!d.isYes ? "selected" : ""}`}
                    disabled
                  >
                    No
                  </button>
                </div>
              )}

              {d.criteria.type === "comment" && (
                <Input.TextArea rows={3} value={d.comment} disabled />
              )}
            </div>
          ))}
        </div>

        {/* Evidence */}
        {currentUserId === review.student?.id && review.evidenceUrl && (
          <div className="criteria-item-box">
            <h2>Minh chứng</h2>
            <div className="evidence-box">
              <img
                src={review.evidenceUrl}
                alt="Minh chứng"
                className="evidence-img"
              />
            </div>
          </div>
        )}

        {/* Verified status */}
        <div className="criteria-item-box">
          {review.isVerified ? (
            <div className="verified-status">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="green"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-check-check"
              >
                <path d="M18 6 7 17l-5-5" />
                <path d="m22 10-7.5 7.5L13 16" />
              </svg>
              <span>Thông tin review đã được xác minh</span>
            </div>
          ) : (
            <div className="not-verified-status">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="red"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-x"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
              <span>Thông tin review chưa được duyệt xác minh</span>
            </div>
          )}
        </div>

        <div>
          <button className="back-btn" onClick={() => navigate(-1)}>
            ← Quay lại
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewDetail;
