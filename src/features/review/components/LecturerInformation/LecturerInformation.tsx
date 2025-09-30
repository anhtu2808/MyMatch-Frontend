import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getLecturerByIdAPI,
  getReviewsAPI,
  getCoursesByLecturerAPI,
} from "../../apis/TeacherPageApis"; // viết riêng hàm call api
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
    <path d="m15 18-6-6 6-6" />
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
    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
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
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
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
    <path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z" />
    <path d="M5 21h14" />
  </svg>
);

interface Review {
  id: number;
  overallScore: number;
}

interface Lecturer {
  id: number;
  name: string;
  code: string;
  bio: string;
  campus?: {
    id: number;
    name: string;
    university?: {
      id: number;
      name: string;
      courses?: { id: number; name: string; code: string }[];
    };
  };
  tags?: { id: number; name: string }[];
  reviewCount: number;
}

interface Course {
  id: number;
  name: string;
  code: string;
}

interface LecturerInformationProps {
  lecturerId: number;
}

const LecturerInformation: React.FC<LecturerInformationProps> = ({
  lecturerId,
}) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [lecturer, setLecturer] = useState<Lecturer | null>(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [averageScore, setAverageScore] = useState<number>(0);
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
      
        const res = await getLecturerByIdAPI(Number(id));
        setLecturer(res.result);
        const reviewRes = await getReviewsAPI({ lecturerId: Number(id) });
        console.log("Review API Response:", reviewRes);

        const reviewList: Review[] = reviewRes.result?.data || [];
        console.log("Review List (data):", reviewList);

        setReviews(reviewList);
        if (reviewList.length > 0) {
          const total = reviewList.reduce((sum, r) => sum + (r.overallScore || 0), 0);
          const avg = total / reviewList.length;
          console.log("Total:", total, "Count:", reviewList.length, "Average:", avg);
          setAverageScore(avg);
        } else {
          setAverageScore(0);
        }


        const courseRes = await getCoursesByLecturerAPI(Number(id));
        const courseList: Course[] = (courseRes.result || []).map(
          (item: any) => item.course
        );
        setCourses(courseList);

        // tính trung bình cộng overallScore
        if (reviewList.length > 0) {
          const avg =
            reviewList.reduce((sum, r) => sum + (r.overallScore || 0), 0) /
            reviewList.length;
          setAverageScore(avg);
        }
      } catch (err) {
        console.error("Error fetching lecturer or reviews:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!lecturer) return <div>Không tìm thấy giảng viên</div>;

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleReviewClick = () => {
    navigate(`/add-review/${lecturer.id}`, {
      state: {
        teacherId: lecturer.id,
        teacherName: lecturer.name,
        teacherCode: lecturer.code,
      },
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
            <div className="teacher-avatar-container">
              {" "}
              <img
                src="https://ptehelper.com.au/wp-content/uploads/2022/12/logo-dai-hoc-fpt.png"
                alt={lecturer.name}
                className="lecturer-avatar"
              />
              {/* <div className="online-indicator"></div> */}
            </div>

            <div className="lecturer-details">
              <h1 className="lecturer-name">{lecturer.name}</h1>
              <p className="lecturer-username">{lecturer.code}</p>
              <p className="lecturer-info">
                {lecturer.campus?.university?.name} • {lecturer.campus?.name}
              </p>
              <p className="lecturer-info">{lecturer.bio || "Chưa có mô tả"}</p>
              <p className="lecturer-info">
                {courses.length
                  ? courses.map((c) => c.code).join(", ")
                  : "Chưa cập nhật môn học"}
              </p>
              <div className="rating-section">
                <div className="stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon
                      key={star}
                      filled={star <= Math.round(averageScore)}
                    />
                  ))}
                </div>
                <div>
                  <span className="rating-text">
                    {averageScore.toFixed(1)}/5.0{" "}
                  </span>
                  <span className="review-count">
                    ({lecturer.reviewCount} lượt review)
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="action-buttons">
            {/* <button className="save-button">
              <HeartIcon />
              Lưu lại
            </button> */}
            <button className="rate-button" onClick={handleReviewClick}>
              Review
            </button>
            <button className="tutor-button" disabled>
              <CrownIcon />
              Gợi ý học tập
              <span className="pro-badge">PRO</span>
              <span className="tooltip-text">Tính năng đang được cập nhật</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LecturerInformation;
