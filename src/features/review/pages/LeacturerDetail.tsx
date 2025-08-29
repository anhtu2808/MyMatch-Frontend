import React from 'react';
import Sidebar from '../../../components/sidebar/Sidebar';
import Header from '../../../components/header/Header';
import LecturerInformation from '../components/LecturerInformation/LecturerInformation';
import LecturerStats from '../components/LecturerStats/LecturerStats';
import ReviewList from '../components/ReviewList/ReviewList';
import './LecturerDetail.css';

function LecturerDetail() {
    return (
        <>
            <div className="lecturer-detail-page-container">
                <Sidebar />
                    <Header title="Chi tiết giảng viên" script="Xem thông tin chi tiết và đánh giá của giảng viên" />
                    <div className="lecturer-detail-content">
                    <LecturerInformation />
                        <div className="divider-vertical">
                            <LecturerStats />
                        </div>
                        <ReviewList />
                    </div>
                    
            </div>
        </>
    )
};

export default LecturerDetail;