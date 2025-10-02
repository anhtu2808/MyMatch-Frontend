import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/sidebar/Sidebar";
import Header from "../../../components/header/Header";
import QuickAction from "../components/QuickAction/QuickAction";
import RecentActivity from "../components/QuickAction/RecentlyAction/RecentlyAction";
import "./Home.css";
import { useAppDispatch } from "../../../store/hooks";
import { getProfileAPI } from "../../profile/apis";
import { setUser, setLoaded } from "../../../store/Slice";
import { useResponsive } from "../../../useResponsive";

function Home() {
  const dispatch = useAppDispatch();
  const isMobile = useResponsive(1024);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      dispatch(setLoaded()); // ✅ vẫn phải set để tránh kẹt trạng thái
      return; // chưa login thì thôi, không gọi API 
    }
    const fetchProfileAndSetUser = async () => {
      try {
        const response = await getProfileAPI();
        dispatch(
          setUser({
            id: response?.result.id,
            studentId: response?.result?.student?.id,
            email: response?.result?.email,
            name: response?.result?.username,
            campus: response?.result?.student?.campus?.id,
            studentCode: response?.result?.student?.studentCode,
            role: response?.result?.role,
            token: response?.result?.token,
          })
        );
      } catch (error) {
        console.log("Failed to fetch profile:", error);
        dispatch(setLoaded());
      }
    };
    fetchProfileAndSetUser();
  }, []);

  return (
    <div className="home-page">
      {!isMobile && <Sidebar />} 
      <Header title="Bảng điều khiển" script="Quản lý hoạt động của bạn" onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} isMobile={isMobile}/>
      {/* Sidebar dạng overlay khi mobile */}
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
