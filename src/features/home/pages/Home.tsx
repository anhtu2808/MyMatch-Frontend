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
import { ReviewRewardNotification } from "../components/ReviewRewardNotification";
import { Gift, Sparkles } from "lucide-react";

function Home() {
  const dispatch = useAppDispatch();
  const isMobile = useResponsive(1024);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showRewardPopup, setShowRewardPopup] = useState(false);
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

              {/* Reward Button - ATTRACTIVE */}
            <button 
                className="reward-button" 
                onClick={() => setShowRewardPopup(true)}
              >
                {/* Hiệu ứng Glow nền */}
                <div className="reward-glow"></div>
                
                {/* Nội dung nút */}
                <div className="reward-content-wrapper">
                  <div className="reward-icon-box">
                    <Gift size={24} strokeWidth={2.5} />
                  </div>
                  
                  <div className="reward-text-group">
                    <span className="reward-title">Nhận Thưởng!</span>
                    <span className="reward-subtitle">1,500 coins khi review giảng viên</span>
                  </div>
                  
                  <div className="reward-sparkle-icon">
                    <Sparkles size={20} />
                  </div>
                </div>
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

      {/* Reward Popup */}
      <ReviewRewardNotification 
        isOpen={showRewardPopup}
        onClose={() => setShowRewardPopup(false)}
      />

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

export default Home;
