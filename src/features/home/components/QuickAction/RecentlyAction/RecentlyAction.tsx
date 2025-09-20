import React, { useEffect, useState } from "react";
import "./RecentlyAction.css";
import { useNavigate } from "react-router-dom";
import {
  getLatestReviewActivityAPI,
  getLatestSwapActivityAPI,
  getLatestLecturerActivityAPI,
} from "../../../apis";
import { useAppSelector } from "../../../../../store/hooks";
import AddInformationModal from "../../../../add-personal-information/components/AddInformationModal";
import { getToken } from "../../../../login/services/localStorageService";

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
const renderStars = (rating: number) =>
  Array.from({ length: 5 }, (_, index) => (
    <StarIcon key={index} filled={index < rating} />
  ));

interface SwapActivity {
  id: number;
  fromClass: string;
  targetClass: string;
  status: string;
  createdAt: string;
}

interface ReviewActivity {
  id: number;
  lecturerName: string;
  createdAt: string;
  overallScore: number;
}

interface LecturerActivity {
  id: number;
  name: string;
  code: string;
  avatarUrl: string;
  rating: number;
  reviewCount: number;
  createAt: string;
}

const RecentActivity: React.FC = () => {
  const navigate = useNavigate();
  const [review, setReview] = useState<ReviewActivity | null>(null);
  const [loading, setLoading] = useState(true);
  const [swap, setSwap] = useState<SwapActivity | null>(null);
  const [lecturer, setLecturer] = useState<LecturerActivity | null>(null);
  const user = useAppSelector((state) => state.user)
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    if (!token) return;
    (async () => {
      try {
        const [latestReview, latestSwap, latestLecturer] = await Promise.all([
          getLatestReviewActivityAPI(),
          getLatestSwapActivityAPI(),
          getLatestLecturerActivityAPI(),
        ]);

        setReview(latestReview);
        setSwap(latestSwap);
        setLecturer(latestLecturer);
      } catch (error) {
        console.error("Lỗi load hoạt động:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, [token]);

  return (
    <>
      {token && (!user?.campus || user?.campus === '' || !user.studentCode) && (
                    <AddInformationModal forceOpen />)}
    <div className="home-recent-activity">
      <div className="home-recent-activity-list">
        {loading && <p>Đang tải...</p>}

        {!loading && !review && !swap && !lecturer && (
          <p>Bạn chưa có hoạt động nào mới gần đây</p>
        )}

        {/* Review activity */}
        {!loading && review && (
          <div
            className="home-activity-item clickable"
            onClick={() => navigate(`/review/${review.id}`)}
          >
            <div className="home-activity-icon">
              {" "}
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
                className="lucide lucide-star-icon"
              >
                {" "}
                <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />{" "}
              </svg>{" "}
            </div>
            <div className="home-activity-info">
              <div className="home-activity-title">
                Review đã đăng tải gần đây
              </div>
              {/* <div className="home-activity-time">
                {new Date(review.createdAt).toLocaleString("vi-VN")}
              </div> */}
            </div>
            <div className="home-activity-status">
              <span className="stars">
                {renderStars(Math.round(review.overallScore))}
                <span className="score"> {review.overallScore.toFixed(1)}</span>
              </span>
            </div>
          </div>
        )}
        {/* Lecturer activity */}
        {!loading && lecturer && (
          <div
            className="home-activity-item clickable"
            onClick={() => navigate(`/lecturer-detail/${lecturer.id}`)}
          >
            <div className="home-activity-icon">
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
                className="lucide lucide-user-round-icon lucide-user-round"
              >
                <circle cx="12" cy="8" r="5" />
                <path d="M20 21a8 8 0 0 0-16 0" />
              </svg>
            </div>
            <div className="home-activity-info">
              <div className="home-activity-title">
                Giảng viên đã review: {lecturer.name}
              </div>
              <div className="home-activity-time">{lecturer.code}</div>
            </div>
          </div>
        )}

        {/* Swap activity */}
        {!loading && swap && (
          <div
            className="home-activity-item clickable"
            onClick={() => navigate(`/swap_class`)}
          >
            <div className="home-activity-icon">
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
                className="lucide lucide-arrow-right-left-icon"
              >
                <path d="m16 3 4 4-4 4" />
                <path d="M20 7H4" />
                <path d="m8 21-4-4 4-4" />
                <path d="M4 17h16" />
              </svg>
            </div>
            <div className="home-activity-info">
              <div className="home-activity-title">
                Yêu cầu đổi lớp {swap.fromClass} ➝ {swap.targetClass}
              </div>
              <div className="home-activity-time">
                {new Date(swap.createdAt).toLocaleString("vi-VN")}
              </div>
            </div>
            <div className="home-activity-status">
              <span
                className={`homestatus ${
                  swap.status === "SENT"
                    ? "pending"
                    : swap.status === "APPROVED"
                    ? "success"
                    : "cancel"
                }`}
              >
                {swap.status}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default RecentActivity;
