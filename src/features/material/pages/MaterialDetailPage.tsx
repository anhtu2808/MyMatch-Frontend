import { useState } from "react";
import Sidebar from "../../../components/sidebar/Sidebar";
import Header from "../../../components/header/Header";
import "./MaterialDetailPage.css";
import MaterialDetail from "../components/MaterialDetailPage/MaterialDetail";
import { useResponsive } from "../../../useResponsive";

const MaterialDetailPage: React.FC = () => {
  const isMobile = useResponsive(1024);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="material-detail-page-container">
      {!isMobile && <Sidebar />}
      <Header
        title="Chi tiết tài liệu"
        script="Xem thông tin chi tiết tài liệu"
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

      <div className="material-detail-content">
        <MaterialDetail />
      </div>
    </div>
  );
};

export default MaterialDetailPage;
