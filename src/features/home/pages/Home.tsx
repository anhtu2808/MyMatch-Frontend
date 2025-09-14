import React from "react";
import Sidebar from "../../../components/sidebar/Sidebar";
import Header from "../../../components/header/Header";
import QuickAction from "../components/QuickAction/QuickAction";
import RecentActivity from "../components/QuickAction/RecentlyAction/RecentlyAction";
import "./Home.css";

function Home() {
  return (
    <div className="home-page">
      <Sidebar />
      <Header title="Bảng điều khiển" script="Quản lý hoạt động của bạn" />
      <div className="home-main-content">
        <div className="home-container">
          <div className="welcome-section">
            <h1 className="welcome-title">
              <span className="welcome-icon">👋</span>
              Chào mừng đến với MyMatch!
            </h1>
            <p className="welcome-description">
              Hôm nay là ngày tuyệt vời để học tập và phát triển
            </p>
          </div>

          <div className="quick-actions">
            <h2 className="section-title">Hành động nhanh</h2>
            <QuickAction />
          </div>
          <h1 className="section-title">Hoạt động gần đây</h1>
          <div className="stats-section">
            <RecentActivity />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
