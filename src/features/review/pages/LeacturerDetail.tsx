import React, { useState } from "react";
import Sidebar from "../../../components/sidebar/Sidebar";
import Header from "../../../components/header/Header";
import LecturerInformation from "../components/LecturerInformation/LecturerInformation";
import LecturerStats from "../components/LecturerStats/LecturerStats";
import ReviewList from "../components/ReviewList/ReviewList";
import { useParams } from "react-router-dom";
import "./LecturerDetail.css";
import { useResponsive } from "../../../useResponsive";

function LecturerDetail() {
  const { id } = useParams<{ id: string }>();
  const isMobile = useResponsive(1024);
  const [sidebarOpen, setSidebarOpen] = useState(false);


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
        {/* <div className="divider-vertical">
                    <LecturerStats lecturerId={Number(id)} />
                </div> */}
        <ReviewList lecturerId={Number(id)} />
      </div>
    </div>
  );
}

export default LecturerDetail;
