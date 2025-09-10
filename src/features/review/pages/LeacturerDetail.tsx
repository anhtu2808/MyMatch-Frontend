import React from "react";
import Sidebar from "../../../components/sidebar/Sidebar";
import Header from "../../../components/header/Header";
import LecturerInformation from "../components/LecturerInformation/LecturerInformation";
import LecturerStats from "../components/LecturerStats/LecturerStats";
import ReviewList from "../components/ReviewList/ReviewList";
import { useParams } from "react-router-dom";
import "./LecturerDetail.css";

function LecturerDetail() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="lecturer-detail-page-container">
      <Sidebar />
      <Header
        title="Chi tiết giảng viên"
        script="Xem thông tin chi tiết và đánh giá của giảng viên"
      />
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
