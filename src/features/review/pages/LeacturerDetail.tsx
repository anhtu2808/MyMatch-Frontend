import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/sidebar/Sidebar";
import Header from "../../../components/header/Header";
import LecturerInformation from "../components/LecturerInformation/LecturerInformation";
import LecturerStats from "../components/LecturerStats/LecturerStats";
import ReviewList from "../components/ReviewList/ReviewList";
import { useParams, useLocation } from "react-router-dom";
import "./LecturerDetail.css";
import { useResponsive } from "../../../useResponsive";
import EmptyReviewState from "../components/EmptyReviewState/EmptyReviewState";
import { getLecturerByIdAPI, getReviewsAPI } from "../apis/TeacherPageApis";

interface Lecturer {
  id: number;
  name: string;
  code: string;
}
interface Review {
  id: number;
}

function LecturerDetail() {
  const { id } = useParams<{ id: string }>();
  const isMobile = useResponsive(1024);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [lecturer, setLecturer] = useState<Lecturer | null>(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    console.log("Fetching data for ID:", id);
    Promise.all([
      getReviewsAPI({ lecturerId: Number(id) }),
      getLecturerByIdAPI(Number(id)) 
    ]).then(([reviewRes, lecturerRes]) => {
      setReviews(reviewRes.result?.data || []);
      setLecturer(lecturerRes.result);
    }).catch(error => {
      console.error("Failed to fetch data:", error);
    }).finally(() => {
      setLoading(false);
    });
  }, [id, location.pathname]);

  return (
    <div className="lecturer-detail-container">
      {!isMobile && <Sidebar />}
      <Header
        title="Chi tiết giảng viên"
        script="Xem thông tin chi tiết và đánh giá của giảng viên"
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        isMobile={isMobile}
      />

      {isMobile && (
        <>
          <div className={`sidebar-drawer ${sidebarOpen ? "open" : ""}`}>
            <Sidebar isMobile={true} />
          </div>
          {sidebarOpen && (
            <div className="overlay" onClick={() => setSidebarOpen(false)} />
          )}
        </>
      )}

      <div className="lecturer-detail-content">
         <LecturerInformation lecturerId={Number(id)} />
        {loading ? (
          <p>Đang tải danh sách review...</p>
        ) : reviews.length > 0 ? (
          <ReviewList lecturerId={Number(id)} />
        ) : (
          lecturer && (
            <EmptyReviewState
              lecturerId={lecturer.id}
              lecturerName={lecturer.name}
              lecturerCode={lecturer.code}
            />
          )
        )}
      </div>
    </div>
  );
}

export default LecturerDetail;
