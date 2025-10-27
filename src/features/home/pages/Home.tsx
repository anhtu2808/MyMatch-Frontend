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
import Footer from "../../../components/footer/Footer";
import { useNavigate } from "react-router-dom";

function Home() {
  const dispatch = useAppDispatch();
  const isMobile = useResponsive(1024);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate()
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      dispatch(setLoaded()); 
      return; 
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
            wallet: response?.result?.wallet?.coin
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
          {/* AI Recommendation Banner */}
          <div className="ai-banner">
            <div className="ai-banner-background">
              <div className="ai-particle ai-particle-1"></div>
              <div className="ai-particle ai-particle-2"></div>
              <div className="ai-particle ai-particle-3"></div>
              <div className="ai-particle ai-particle-4"></div>
              <div className="ai-particle ai-particle-5"></div>
              <div className="ai-particle ai-particle-6"></div>
            </div>

            <div className="ai-banner-content">
              <div className="ai-banner-text">
                <h1 className="welcome-title">
                  <span className="welcome-icon">👋</span>
                  Chào mừng đến với <span className="ai-text-glow">MyMatch!</span>
                </h1>
                <p className="welcome-description">
                  Hôm nay là ngày tuyệt vời để học tập và phát triển
                </p>
              </div>

              <button className="ai-banner-button" onClick={() => navigate("/teachers")}>
                <div className="button-shimmer"></div>
                <svg
                  className="button-icon"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
                <span className="button-text">Hãy thử ngay</span>
              </button>
            </div>

            <div className="ai-banner-border"></div>
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
      <Footer />
    </div>
  );
}

export default Home;
